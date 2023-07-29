import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/authorization/roleAuth/role.enum';
import { Roles } from 'src/authorization/roleAuth/roles.decorator';
import { CanEditUserInfoGuard } from 'src/authorization/canEditInfo/canEditUserInfo.guard';
import { RolesGuard } from 'src/authorization/roleAuth/roles.guard';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin, Role.Business, Role.Private)
  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }
  // @Roles(Role.Admin)
  // @UseGuards(JwtAuthGuard, CanEditUserInfoGuard, RolesGuard)
  // @Get()
  // findAll() {
  //   return this.eventsService.findAll();
  // }
  @Roles(Role.Admin, Role.Business, Role.Private)
  @UseGuards(JwtAuthGuard, CanEditUserInfoGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }
  @Roles(Role.Admin, Role.Business, Role.Private)
  @UseGuards(JwtAuthGuard, CanEditUserInfoGuard, RolesGuard)
  @Get('/allBusinessEvent/:id')
  async findAllBusinessUsersEvents(@Param('id') id: string) {
    const data = await this.eventsService.findAllBusinessUsersEvents(id);
    return data;
  }

  @Roles(Role.Admin, Role.Business, Role.Private)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: CreateEventDto) {
    return this.eventsService.update(id, updateEventDto);
  }
  @Roles(Role.Admin, Role.Business, Role.Private)
  @UseGuards(JwtAuthGuard)
  @Patch('/updateExpanse/:id')
  updateExpanse(
    @Param('id') id: string,
    @Body() updateEventDto: CreateEventDto['expenses'],
  ) {
    return this.eventsService.updateExpanse(id, updateEventDto);
  }
  @Roles(Role.Admin, Role.Business, Role.Private)
  @UseGuards(JwtAuthGuard)
  @Patch('/updateGuest/:id')
  updateGuest(
    @Param('id') id: string,
    @Body() updateEventDto: CreateEventDto['guestList'],
  ) {
    return this.eventsService.updateGuestList(id, updateEventDto);
  }
  @Roles(Role.Admin, Role.Business, Role.Private)
  @UseGuards(JwtAuthGuard)
  @Patch('/updateTask/:id')
  updateTask(
    @Param('id') id: string,
    @Body() updateEventDto: CreateEventDto['tasks'],
  ) {
    return this.eventsService.updateTaskList(id, updateEventDto);
  }
  @Roles(Role.Admin, Role.Business, Role.Private)
  @UseGuards(JwtAuthGuard)
  @Patch('/deleteExpanse/:eventId/:expanseId')
  deleteExpanse(
    @Param('eventId') eventId: string,
    @Param('expanseId') expanseId: string,
    @Body() expanseInfo: { totalCost: number; deposit: number },
    // @Body() updateEventDto: CreateEventDto['tasks'],
  ) {
    return this.eventsService.deleteExpanse(eventId, expanseId, expanseInfo);
  }
  @Roles(Role.Admin, Role.Business, Role.Private)
  @UseGuards(JwtAuthGuard)
  @Patch('/deleteGuest/:eventId/:guestId')
  deleteGuest(
    @Param('eventId') eventId: string,
    @Param('guestId') guestId: string,
    @Body() guestInfo: { amount: number; isBrideSide: boolean },
    // @Body() updateEventDto: CreateEventDto['tasks'],
  ) {
    return this.eventsService.deleteGuest(eventId, guestId, guestInfo);
  }
  @Roles(Role.Admin, Role.Business, Role.Private)
  @UseGuards(JwtAuthGuard)
  @Patch('/deleteTask/:eventId/:taskId')
  deleteTask(
    @Param('eventId') eventId: string,
    @Param('taskId') taskId: string,
    @Body() taskInfo: { completed: boolean; priority: 'High' | 'Low' },
    // @Body() updateEventDto: CreateEventDto['tasks'],
  ) {
    return this.eventsService.deleteTask(eventId, taskId, taskInfo);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }
}
