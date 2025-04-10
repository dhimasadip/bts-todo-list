import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../auth/user.entity';
import { Item } from '../item/item.entity';

@Entity()
export class Checklist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => User, user => user.checklists, {
    eager: false
  })
  user: User;

  @OneToMany(() => Item, item => item.checklist, {
    cascade: ['insert']
  })
  items: Item[];
}