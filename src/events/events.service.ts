import {
  HttpException,
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BlobOptions } from 'buffer';
import { Model } from 'mongoose';
import { totalmem } from 'os';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { CreateEventDto } from './dto/create-event.dto';
// import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly usersService: UsersService,
  ) {}
  async create(createEventDto: CreateEventDto) {
    const newEvent = new this.eventModel(createEventDto);
    // check the user input
    CreateEventDto.validate(createEventDto);
    //check if the user exist in the database
    const isEventToUpdate = await this.eventModel.findOne({
      connectedUser: createEventDto.connectedUser,
    });
    //add event
    try {
      if (isEventToUpdate) {
        let updated = await this.eventModel.findByIdAndUpdate(
          { _id: isEventToUpdate._id },
          createEventDto,
          { new: true, returnDocument: 'after' },
        );
        await this.userModel.findOneAndUpdate(
          {
            email: createEventDto.connectedUser,
          },
          {
            eventData: updated._id,
            eventPannerName: updated.eventPlanner,
          },
          await this.userModel.findOneAndUpdate(
            {
              _id: updated.eventUser,
            },
            {
              eventData: updated._id,
              eventPannerName: updated.eventPlanner,
              $addToSet: { connectedUsers: createEventDto.connectedUser },
            },
          );
        );
      } else {
        // update of create
        const createdEvent = await newEvent.save();
        const privateUser = await this.userModel.findOneAndUpdate(
          {
            email: createEventDto.connectedUser,
          },
          {
            eventData: createdEvent._id,
            eventPannerName: createdEvent.eventPlanner,
          },
        );

        const businessUser = await this.userModel.findOneAndUpdate(
          {
            _id: createdEvent.eventUser,
          },
          {
            eventData: createdEvent._id,
            eventPannerName: createdEvent.eventPlanner,
            $addToSet: { connectedUsers: createEventDto.connectedUser },
          },
        );

        return createdEvent;
      }
    } catch (error) {
      throw new HttpException(error, 501, {
        cause: new Error(error),
      });
    }
  }

  async findAll() {
    const allEvent = await this.eventModel.find();
    if (!allEvent || allEvent.length <= 0)
      throw new NotFoundException('No Events found');
    return allEvent;
  }

  async findOne(id: string) {
    let event;
    if (id !== 'No Event Connected') {
      event = await this.eventModel.findOne({
        $or: [{ _id: id }, { email: id }],
      });
    }
    if (!event) throw new NotFoundException('event not found');
    return event;
  }
  async findAllBusinessUsersEvents(email: string) {
    // let event;
    let user = await this.userModel.findOne({
      email: email,
    });

    const listOfUsers = await Promise.all(
      user.connectedUsers.map(async (emailUser) => {
        const user = await this.userModel.findOne({
          email: emailUser,
        });
        if (user) {
          const objToAddToArray = {
            groomName: user.groomName,
            brideName: user.brideName,
            eventData: user.eventData,
          };
          return objToAddToArray;
        }
      }),
    );
    return listOfUsers;
  }

  async update(id: string, updateEventDto: CreateEventDto) {
    const res = await this.eventModel.updateOne({ _id: id }, updateEventDto, {
      returnOriginal: false,
    });
    if (res.matchedCount === 0) throw new NotFoundException('Event not found');
    return 'Event Updated';
  }
  async updateExpanse(id: string, updateEventDto: CreateEventDto['expenses']) {
    // const event = await this.eventModel.findOne({ _id: id });
    // event.expenses.push(updateEventDto);
    // await event.save();
    const res = await this.eventModel.updateOne(
      { _id: id },
      { $push: { expenses: updateEventDto } },
      {
        returnOriginal: false,
      },
    );
    if (res.matchedCount === 0) throw new NotFoundException('Event not found');
    return 'Event Updated';
  }
  async updateGuestList(
    id: string,
    updateEventDto: CreateEventDto['guestList'],
  ) {
    // const event = await this.eventModel.findOne({ _id: id });
    // event.expenses.push(updateEventDto);
    // await event.save();
    const res = await this.eventModel.updateOne(
      { _id: id },
      { $push: { guestList: updateEventDto } },
      {
        returnOriginal: false,
      },
    );
    if (res.matchedCount === 0) throw new NotFoundException('Event not found');
    return 'Event Updated';
  }
  async updateTaskList(id: string, updateEventDto: CreateEventDto['tasks']) {
    // const event = await this.eventModel.findOne({ _id: id });
    // event.expenses.push(updateEventDto);
    // await event.save();
    const res = await this.eventModel.updateOne(
      { _id: id },
      { $push: { tasks: updateEventDto } },
      {
        returnOriginal: false,
      },
    );
    if (res.matchedCount === 0) throw new NotFoundException('Event not found');
    return 'Event Updated';
  }
  async deleteExpanse(
    eventId: string,
    expanseId: string,
    expanseInfo: { totalCost: number; deposit: number },
  ) {
    const event = await this.eventModel.findOne({ _id: eventId });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    const totalCost = expanseInfo.totalCost;
    const deposit = expanseInfo.deposit;

    const updatedLeftToSpend = event.leftToSpend + totalCost;
    const updatedAlreadyPaid = event.alreadyPaid - deposit;
    const updatedTotalSpent = event.totalSpent - totalCost;

    const res = await this.eventModel.updateOne(
      { _id: eventId },
      {
        $set: {
          leftToSpend: updatedLeftToSpend,
          alreadyPaid: updatedAlreadyPaid,
          totalSpent: updatedTotalSpent,
        },
        $pull: { expenses: { id: Number(expanseId) } },
      },
      { returnOriginal: false },
    );

    if (res.matchedCount === 0) throw new NotFoundException('Event not found');
    return 'Expense Deleted';
  }
  async deleteGuest(
    eventId: string,
    guestId: string,
    guestInfo: { amount: number; isBrideSide: boolean },
  ) {
    const event = await this.eventModel.findOne({ _id: eventId });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    const amount = guestInfo.amount;
    const isBrideSide = guestInfo.isBrideSide;

    const updatedTotalGuestByList = event.totalGuestByList - amount;
    const updatedIsBrideSide = isBrideSide
      ? event.brideSide - amount
      : event.groomSide - amount;
    const setFields: { [key: string]: any } = {
      totalGuestByList: updatedTotalGuestByList,
      // brideSide: updatedIsBrideSide,
    };

    // Conditionally add the field based on isBrideSide
    setFields[isBrideSide ? 'brideSide' : 'groomSide'] = isBrideSide
      ? event.brideSide - amount
      : event.groomSide - amount;

    const res = await this.eventModel.updateOne(
      { _id: eventId },
      {
        $set: setFields,
        $pull: { guestList: { id: Number(guestId) } },
      },
      { returnOriginal: false },
    );

    if (res.matchedCount === 0) throw new NotFoundException('Event not found');
    return 'Guest Deleted';
  }
  async deleteTask(
    eventId: string,
    guestId: string,
    taskInfo: { completed: boolean; priority: 'High' | 'Low' },
  ) {
    const event = await this.eventModel.findOne({ _id: eventId });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    const completed = taskInfo.completed;
    const priority = taskInfo.priority;

    const updatedCompleted = completed
      ? event.todoCompleted - 1
      : event.todoCompleted;
    // const updatedPriority =
    //   priority === 'High' ? event.todoHigh - 1 : event.todoLow - 1;
    const setFields: { [key: string]: any } = {
      completed: updatedCompleted,
      // brideSide: updatedIsBrideSide,
      totalTodoLeft: event.totalTodoLeft - 1,
    };

    // Conditionally add the field based on isBrideSide
    setFields[priority === 'High' ? 'todoHigh' : 'todoLow'] =
      priority === 'High' ? event.todoHigh - 1 : event.todoLow - 1;

    const res = await this.eventModel.updateOne(
      { _id: eventId },
      {
        $set: setFields,
        $pull: { tasks: { id: Number(guestId) } },
      },
      { returnOriginal: false },
    );

    if (res.matchedCount === 0) throw new NotFoundException('Event not found');
    return 'Guest Deleted';
  }

  async remove(id: string) {
    const eventToDelete = await this.eventModel.deleteOne({ _id: id });
    if (eventToDelete.deletedCount === 0)
      throw new NotFoundException('Event not found');
    return 'Event deleted successfully';
  }
}

// if (id !== 'No Event Connected') {
//   event = await this.eventModel.findOne({
//     $or: [{ _id: id }, { email: id }],
//   });
// }
// if (!event) throw new NotFoundException('event not found');
