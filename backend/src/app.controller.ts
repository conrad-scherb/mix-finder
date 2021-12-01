import { findAdjacentTracks, Track, TrackList } from '1001-tracklists-scraper';
import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { trackToAppearanceURLs } from './utils/helpers';
import * as fs from "fs";
import * as csv from "csv-parser";
import * as path from "path";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("get-tracklists")
  async getTracklists(
    @Body("url") url: string
  ): Promise<TrackList> {
    return await this.appService.getTracklist(url);
  }
  
  @Post("get-track")
  async getTracks(
    @Body("url") url: string
  ): Promise<Track> {
    return await this.appService.getTrack(url);
  }

  @Post("find-relations")
  async findRelatedTracks (
    @Body("id") id: string
  ): Promise<any> {
    const track = await this.appService.getTrack(id);
    const tracklistUrls = trackToAppearanceURLs(track);

    // Get the list of socks
    const results = []
    const getSocksProxies = new Promise((resolve) => {
      fs.createReadStream(path.join(__dirname + "/.." +'/src/socks5.csv'))
        .pipe(csv(["Proxy", "Region"]))
        .on('data', (data) => results.push(data))
        .on('end', () => {
            resolve(results);
        });
    });

    const socksProxies = await getSocksProxies;
    const scrapePromises: Promise<string[]>[] = [];

    for (const i in tracklistUrls) {
      const scrape = findAdjacentTracks(tracklistUrls[i], id, socksProxies[i].Proxy.replaceAll('"', ''));
      scrapePromises.push(scrape);
    }
    
    const adjacentTracks = await Promise.all(scrapePromises);

    return Array.prototype.concat.apply([], adjacentTracks); // Nodes of all related tracks
  }
}
