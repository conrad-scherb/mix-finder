import { TrackList, Track } from '1001-tracklists-scraper';
import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('get-tracklists')
  async getTracklists(@Body('url') url: string): Promise<TrackList> {
    return await this.appService.getTracklist(url);
  }

  @Post('get-track')
  async getTracks(@Body('url') url: string): Promise<Track> {
    return await this.appService.getTrack(url);
  }

  @Post('get-adjacent-details')
  async getAdjacentTrackDetails(@Body('id') id: string): Promise<any> {
    return await this.appService.getAdjacentTrackDetails(id);
  }
}
