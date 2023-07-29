import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
// import bcrypt from 'bcrypt';
const bcrypt = require('bcrypt');

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    // check the user input
    CreateUserDto.validate(createUserDto);
    //check if the user exist in the database
    const existingUser = await this.userModel
      .findOne({ email: createUserDto.email })
      .exec();
    if (existingUser) throw new ConflictException('User already exist');

    // creating the model + hasing the password
    const newUser = new this.userModel(createUserDto);
    const saltRounds = 10;
    await bcrypt.hash(newUser.password, saltRounds).then(function (hash) {
      newUser.password = hash;
    });
    // add new user
    try {
      const userToCreate = await newUser.save();

      return userToCreate;
    } catch (error) {
      throw new NotFoundException('User not created');
    }
  }

  async findAll() {
    const allUsers = await this.userModel.find();
    if (!allUsers) throw new NotFoundException('No Users found');
    return allUsers;
  }

  async findOne(emailFromClient: string) {
    const user: User = await this.userModel.findOne({ email: emailFromClient });
    if (!user) throw new NotFoundException(`${emailFromClient} not found`);
    const {
      brideName,
      businessAccount,
      email,
      eventData,
      fullName,
      groomName,
      eventPannerName,
      typeOfUser,
      ...data
    } = user;
    const userToSend = {
      brideName: brideName,
      businessAccount: businessAccount,
      email: email,
      eventData: eventData,
      fullName: fullName,
      groomName: groomName,
      eventPannerName: eventPannerName,
      typeOfUser: typeOfUser,
    };

    return userToSend;
  }
  async findOneForLogin(email: string) {
    const user: User = await this.userModel.findOne({ email: email });
    if (!user) throw new NotFoundException(`${email} not found`);
    return user;
  }
  async findOneById(id: string) {
    const user = await this.userModel.findById({ _id: id });
    if (!user) throw new NotFoundException(`user not found`);
    return user;
  }

  async update(email: string, updateUserDto: UpdateUserDto) {
    const res = await this.userModel.updateOne(
      { email: email },
      updateUserDto,
      {
        returnOriginal: false,
        returnDocument: 'after',
      },
    );
    if (res.matchedCount === 0)
      throw new NotFoundException(`${email} not found`);
    return `User Updated`;
  }

  async remove(email: string) {
    const userToDelete = await this.userModel.deleteOne({ email: email });
    if (userToDelete.deletedCount === 0)
      throw new NotFoundException(`${email} not found`);
    return `${email} deleted successfully`;
  }
}
