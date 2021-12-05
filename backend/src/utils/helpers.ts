import { Track } from '1001-tracklists-scraper';

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
