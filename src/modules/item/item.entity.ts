import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Checklist } from '../checklist/checklist.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ default: false })
  completed: boolean;

  @ManyToOne(() => Checklist, checklist => checklist.items, { onDelete: 'CASCADE' })
  checklist: Checklist;
}
