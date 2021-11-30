import { findAdjacentTracks, Track, TrackList } from '1001-tracklists-scraper';
import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { trackToAppearanceURLs } from './utils/helpers';

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
    
    const adjacentTracks = await Promise.all(tracklistUrls.map(t => findAdjacentTracks(t, id)))

    return Array.prototype.concat.apply([], adjacentTracks); // Nodes of all related tracks
  }
}
