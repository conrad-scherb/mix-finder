import { Injectable } from '@nestjs/common';
import {
  DJSet,
  findAdjacentTracks,
  getTrack,
  getTracklist,
  Track,
  TrackList,
} from '1001-tracklists-scraper';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import * as path from 'path';
import {
  getIdFromURL,
  trackToAppearanceNames,
  trackToAppearanceURLs,
} from './utils/helpers';
import { addTrackToRepository } from './utils/database';
import { getRepository } from 'typeorm';
import { TrackEntity } from './model/track.entity';

@Injectable()
export class AppService {
  socksProxies: string[] = [];
  socksProxyListPosition = 0;

  constructor() {
    const results = [];
    fs.createReadStream(path.join(__dirname + '/..' + '/src/socks5.csv'))
      .pipe(csv(['Proxy', 'Region']))
      .on('data', (data) => results.push(data))
      .on('end', () => {
        this.socksProxies = results.map((r) => r.Proxy);
      });
  }

  async getTracklist(url: string): Promise<TrackList | undefined> {
    return await getTracklist(url, null);
  }

  async getTrack(
    url: string,
    proxy: string | null = null,
  ): Promise<Track | undefined> {
    const trackFromDB = await getRepository(TrackEntity).findOne({
      id: getIdFromURL(url),
    });

    if (trackFromDB) {
      const appearances: DJSet[] = [];
      for (const i in trackFromDB.appearanceURLs) {
        appearances.push({
          name: trackFromDB.appearanceNames[i],
          url: trackFromDB.appearanceURLs[i],
        });
      }

      const track: Track = {
        url: `https://1001tracklists.com/track/${trackFromDB.id}`,
        title: trackFromDB.title,
        artist: trackFromDB.artist,
        artwork: trackFromDB.artwork,
        appearances: appearances,
      };

      return track;
    } else {
      if (proxy == null) {
        proxy = this.socksProxies[this.socksProxyListPosition];
      }

      const track = await getTrack(url, proxy);

      if (track) {
        await addTrackToRepository(track, getIdFromURL(track.url));
      }

      this.rotateProxies(1);

      return track;
    }
  }

  async getBatchTracks(urls: string[]): Promise<(Track | undefined)[]> {
    const promises = [];
    for (const i in urls) {
      promises.push(
        this.getTrack(
          urls[i],
          this.socksProxies[parseInt(i) + this.socksProxyListPosition].replace(
            /"/g,
            '',
          ),
        ),
      );
    }
    return await Promise.all(promises);
  }

  async getAdjacentTracks(id: string): Promise<string[]> {
    const trackFromDB = await getRepository(TrackEntity).findOne({
      id: id,
    });

    if (trackFromDB && trackFromDB?.edges != null) {
      return trackFromDB.edges;
    } else {
      const track = await this.getTrack(id);
      const tracklistUrls = trackToAppearanceURLs(track);
      const scrapePromises: Promise<string[]>[] = [];

      for (const i in tracklistUrls) {
        const scrape = findAdjacentTracks(
          tracklistUrls[parseInt(i)],
          id,
          this.socksProxies[parseInt(i) + this.socksProxyListPosition].replace(
            /"/g,
            '',
          ),
        );
        scrapePromises.push(scrape);
      }

      this.rotateProxies(tracklistUrls.length);

      const adjacentTracks = await Promise.all(scrapePromises);
      const adjacentTrackIds = Array.prototype.concat.apply([], adjacentTracks);

      await addTrackToRepository(track, id, adjacentTrackIds);

      return adjacentTrackIds;
    }
  }

  async getAdjacentTrackDetails(id: string): Promise<Track[]> {
    const adjacentTracks = await this.getAdjacentTracks(id);
    return await this.getBatchTracks(adjacentTracks);
  }

  rotateProxies(by: number) {
    this.socksProxyListPosition =
      this.socksProxyListPosition + by < this.socksProxies.length
        ? this.socksProxyListPosition + by
        : 0;
  }
}
