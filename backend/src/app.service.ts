import { Injectable } from '@nestjs/common';
import { findAdjacentTracks, getTrack, getTracklist, Track, TrackInTracklist, TrackList, TracklistSearchResult } from '1001-tracklists-scraper';
import * as fs from "fs";
import * as csv from "csv-parser";
import * as path from "path";
import { trackToAppearanceURLs } from './utils/helpers';

@Injectable()
export class AppService {
  socksProxies: string[] = [];
  socksProxyListPosition: number = 0;
  
  constructor() {
    const results = []
    fs.createReadStream(path.join(__dirname + "/.." +'/src/socks5.csv'))
      .pipe(csv(["Proxy", "Region"]))
      .on('data', (data) => results.push(data))
      .on('end', () => {
          this.socksProxies = results.map(r => r.Proxy);
          console.log(this.socksProxies)
      });
  }

  async getTracklist(url: string): Promise<TrackList | undefined> {
    return await getTracklist(url, null);
  }

  async getTrack(url: string): Promise<Track | undefined> {
    return await getTrack(url);
  }

  async getBatchTracks(urls: string[]): Promise<(Track | undefined)[]> {
    const promises = [];
    for (const i in urls) {
      promises.push(getTrack(urls[i], this.socksProxies[parseInt(i)+this.socksProxyListPosition].replace(/"/g, '')));
    }
    this.rotateProxies(promises.length)  
    return await Promise.all(promises);
  }

  async getAdjacentTracks(id: string) {
    const track = await this.getTrack(id);
    const tracklistUrls = trackToAppearanceURLs(track);
    const scrapePromises: Promise<string[]>[] = [];

    for (const i in tracklistUrls) {
      const scrape = findAdjacentTracks(tracklistUrls[parseInt(i)], id, this.socksProxies[parseInt(i)+this.socksProxyListPosition].replace(/"/g, ''));
      scrapePromises.push(scrape);
    }

    this.rotateProxies(tracklistUrls.length)    
    
    const adjacentTracks = await Promise.all(scrapePromises);

    return Array.prototype.concat.apply([], adjacentTracks); // Nodes of all related tracks
  }

  rotateProxies(by: number) {
    this.socksProxyListPosition = (this.socksProxyListPosition + by < this.socksProxies.length) ? this.socksProxyListPosition + by : 0
  }
}
