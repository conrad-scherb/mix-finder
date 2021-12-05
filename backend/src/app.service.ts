import { Injectable } from '@nestjs/common';
import {
  findAdjacentTracks,
  getTrack,
  getTracklist,
  Track,
  TrackList,
} from '1001-tracklists-scraper';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import * as path from 'path';
import { trackToAppearanceNames, trackToAppearanceURLs } from './utils/helpers';
import { getConnection, getRepository } from 'typeorm';
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
    const track = await getTrack(url, proxy);
    const trackForDB = new TrackEntity();
    trackForDB.id = track.url.replace(
      'https://www.1001tracklists.com/track/',
      '',
    );
    trackForDB.artist = track.artist;
    trackForDB.artwork = track.artwork;
    trackForDB.title = track.title;
    trackForDB.appearanceNames = trackToAppearanceNames(track);
    trackForDB.appearanceURLs = trackToAppearanceURLs(track);
    console.log(trackForDB);
    await getConnection().manager.save(trackForDB);

    return track;
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
    this.rotateProxies(promises.length);
    return await Promise.all(promises);
  }

  async getAdjacentTracks(id: string) {
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

    const trackForDB = new TrackEntity();
    trackForDB.id = id;
    trackForDB.artist = track.artist;
    trackForDB.title = track.title;
    trackForDB.artwork = track.artwork;
    trackForDB.edges = adjacentTrackIds;
    trackForDB.appearanceNames = trackToAppearanceNames(track);
    trackForDB.appearanceURLs = tracklistUrls;

    await getConnection().manager.save(trackForDB);

    return adjacentTrackIds;
  }

  rotateProxies(by: number) {
    this.socksProxyListPosition =
      this.socksProxyListPosition + by < this.socksProxies.length
        ? this.socksProxyListPosition + by
        : 0;
  }
}
