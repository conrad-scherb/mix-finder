import { Track } from '1001-tracklists-scraper';
import { TrackEntity } from 'src/model/track.entity';
import { getConnection } from 'typeorm';

export function trackToAppearanceURLs(track: Track): string[] {
  const strings: string[] = [];
  for (const appearance of track.appearances) {
    strings.push(appearance.url);
  }
  return strings;
}

export function trackToAppearanceNames(track: Track): string[] {
  const strings: string[] = [];
  for (const appearance of track.appearances) {
    strings.push(appearance.name);
  }
  return strings;
}

export function getIdFromURL(url: string): string {
  return url.replace('https://www.1001tracklists.com/track/', '');
}