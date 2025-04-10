import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChecklistDto, CreateItemDto, UpdateItemDto } from './dto';
import { User } from '../auth/user.entity';
import { Checklist } from './checklist.entity';
import { Item } from '../item/item.entity';

@Injectable()
export class ChecklistService {
  constructor(
    @InjectRepository(Checklist)
    private checklistRepo: Repository<Checklist>,
    @InjectRepository(Item)
    private itemRepo: Repository<Item>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) { }

  async create(dto: CreateChecklistDto, userId: number) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new BadRequestException('User not found')
    }
    const checklist = this.checklistRepo.create(({ ...dto, user }) as any);
    await this.checklistRepo.save(checklist);
    return checklist
  }

  async findAll(userId: number) {
    return this.checklistRepo.find({ where: { user: { id: userId } }, relations: ['items'] });
  }

  async findOne(id: number, userId: number) {
    const checklist = await this.checklistRepo.findOne({ where: { id }, relations: ['user', 'items'] });
    if (!checklist) throw new NotFoundException('Checklist not found');
    if (checklist.user.id !== userId) throw new ForbiddenException('Access denied');
    return checklist;
  }

  async remove(id: number, userId: number) {
    const checklist = await this.checklistRepo.findOne({ where: { id }, relations: ['user'] });
    if (!checklist) throw new NotFoundException('Checklist not found');
    if (checklist.user.id !== userId) throw new ForbiddenException('Access denied');
    await this.checklistRepo.remove(checklist);
    return { message: 'Checklist deleted successfully' };

  }

  async addItem(checklistId: number, dto: CreateItemDto, userId: number) {
    const checklist = await this.checklistRepo.findOne({ where: { id: checklistId }, relations: ['user'] });
    if (!checklist) throw new NotFoundException('Checklist not found');
    if (checklist.user.id !== userId) throw new ForbiddenException('Access denied');
    const item = this.itemRepo.create({ ...dto, checklist });
    return this.itemRepo.save(item);
  }

  async getItem(itemId: number, userId: number) {
    const item = await this.itemRepo.findOne({ where: { id: itemId }, relations: ['checklist', 'checklist.user'] });
    if (!item) throw new NotFoundException('Item not found');
    if (item.checklist.user.id !== userId) throw new ForbiddenException('Access denied');
    return item;
  }

  async updateItem(itemId: number, dto: UpdateItemDto, userId: number) {
    const item = await this.itemRepo.findOne({ where: { id: itemId }, relations: ['checklist', 'checklist.user'] });
    if (!item) throw new NotFoundException('Item not found');
    if (item.checklist.user.id !== userId) throw new ForbiddenException('Access denied');
    Object.assign(item, dto);
    return this.itemRepo.save(item);

  }

  async deleteItem(itemId: number, userId: number) {
    const item = await this.itemRepo.findOne({ where: { id: itemId }, relations: ['checklist', 'checklist.user'] });
    if (!item) throw new NotFoundException('Item not found');
    if (item.checklist.user.id !== userId) throw new ForbiddenException('Access denied');
    await this.itemRepo.remove(item);
    return { message: 'Item deleted successfully' };
  }
}