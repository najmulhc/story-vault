import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Story {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  description: string;
}
