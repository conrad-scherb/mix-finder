import { Column, PrimaryColumn } from 'typeorm';

export abstract class TrackEntity {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  aritst: string;

  @Column({ type: 'varchar', length: 255 })
  artwork: string;

  @Column('simple-array')
  edges: string[];
}
