import { Track } from "1001-tracklists-scraper";

export function trackToAppearanceURLs(track: Track): string[] {
    let strings: string[] = [];
    for (let appearance of track.appearances) {
        strings.push(appearance.url);
    }
    return strings;
}