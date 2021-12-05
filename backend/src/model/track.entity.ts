import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class TrackEntity {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  artist: string;

  @Column({ type: 'varchar', length: 255 })
  artwork: string;

  @Column('simple-array', { nullable: true })
  edges: string[] | null;

  @Column('simple-array')
  appearanceNames: string[];

  @Column('simple-array')
  appearanceURLs: string[];
}
