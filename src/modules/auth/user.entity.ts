import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Checklist } from '../checklist/checklist.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => Checklist, checklist => checklist.user, { eager: false })
  checklists: Checklist[];
}