import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChecklistController } from './checklist.controller';
import { ChecklistService } from './checklist.service';
import { User } from '../auth/user.entity';
import { Checklist } from './checklist.entity';
import { Item } from '../item/item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Checklist, Item, User])],
  controllers: [ChecklistController],
  providers: [ChecklistService],
})
export class ChecklistModule { }