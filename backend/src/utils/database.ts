import { Track } from '1001-tracklists-scraper';
import { TrackEntity } from 'src/model/track.entity';
import { getConnection } from 'typeorm';
import { trackToAppearanceNames, trackToAppearanceURLs } from './helpers';

export async function addTrackToRepository(
  track: Track,
  id: string,
  edges: string[] | null = null,
) {
  const trackForDB = new TrackEntity();
  trackForDB.id = id;
  trackForDB.artwork = track.artwork;
  trackForDB.artist = track.artist.replace('&amp;', '&');
  trackForDB.title = track.title.replace('&amp;', '&');
  trackForDB.edges = edges;
  trackForDB.appearanceNames = trackToAppearanceNames(track);
  trackForDB.appearanceURLs = trackToAppearanceURLs(track);
  await getConnection().manager.save(trackForDB);
}
