import { Injectable } from '@nestjs/common';
import { getTrack, getTracklist, Track, TrackInTracklist, TrackList, TracklistSearchResult } from '1001-tracklists-scraper';

@Injectable()
export class AppService {
  async getTracklist(url: string): Promise<TrackList | undefined> {
    return await getTracklist(url);
  }

  async getTrack(url: string): Promise<Track | undefined> {
    return await getTrack(url);
  }
}
