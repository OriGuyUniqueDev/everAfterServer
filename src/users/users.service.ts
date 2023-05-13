import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);
    // check the user input
    CreateUserDto.validate(createUserDto);
    //check if the user exist in the database
    const existingUser = await this.userModel
      .findOne({ email: createUserDto.email })
      .exec();
    if (existingUser) throw new ConflictException('User already exist');
    // add new user
    try {
      const createdUser = await newUser.save();
      return createdUser;
    } catch (error) {
      throw new NotFoundException('User not created');
    }
  }

  async findAll() {
    const allUsers = await this.userModel.find();
    if (!allUsers) throw new NotFoundException('No Users found');
    return allUsers;
  }

  async findOne(email: string) {
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
      { returnOriginal: false, returnDocument: 'after' },
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
