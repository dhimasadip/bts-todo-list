import { Controller, Post, Body, UseGuards, Req, Get, Delete, Param, Patch } from '@nestjs/common';
import { CreateChecklistDto, CreateItemDto, UpdateItemDto } from './dto';
import { JwtAuthGuard } from '../../common/jwt-auth.guard';
import { Request } from 'express';
import { ChecklistService } from './checklist.service';

@Controller('checklists')
@UseGuards(JwtAuthGuard)
export class ChecklistController {
  constructor(private readonly checklistService: ChecklistService) { }

  @Post()
  create(@Body() dto: CreateChecklistDto, @Req() req: Request) {
    const userId = (req as any).user['userId'];
    console.log(userId, 'userId')
    return this.checklistService.create(dto, userId);
  }

  @Get()
  findAll(@Req() req: Request) {
    const userId = (req as any).user['userId'];
    return this.checklistService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @Req() req: Request) {
    const userId = (req as any).user['userId'];
    return this.checklistService.findOne(id, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @Req() req: Request) {
    const userId = (req as any).user['userId'];
    return this.checklistService.remove(id, userId);
  }

  @Post(':id/items')
  addItem(@Param('id') id: number, @Body() dto: CreateItemDto, @Req() req: Request) {
    const userId = (req as any).user['userId'];
    return this.checklistService.addItem(id, dto, userId);
  }

  @Get('items/:itemId')
  getItem(@Param('itemId') itemId: number, @Req() req: Request) {
    const userId = (req as any).user['userId'];
    return this.checklistService.getItem(itemId, userId);
  }

  @Patch('items/:itemId')
  updateItem(@Param('itemId') itemId: number, @Body() dto: UpdateItemDto, @Req() req: Request) {
    const userId = (req as any).user['userId'];
    return this.checklistService.updateItem(itemId, dto, userId);
  }

  @Delete('items/:itemId')
  deleteItem(@Param('itemId') itemId: number, @Req() req: Request) {
    const userId = (req as any).user['userId'];
    return this.checklistService.deleteItem(itemId, userId);
  }
}