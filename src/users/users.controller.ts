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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/authorization/roleAuth/roles.decorator';
import { Role } from 'src/authorization/roleAuth/role.enum';
import { RolesGuard } from 'src/authorization/roleAuth/roles.guard';
import { CanEditUserInfoGuard } from 'src/authorization/canEditInfo/canEditUserInfo.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('registerMe')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @Roles(Role.Admin,Role.Business,Role.Private)
  @UseGuards(JwtAuthGuard,RolesGuard,CanEditUserInfoGuard)
  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.usersService.findOne(email);
  }
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Patch(':email')
  update(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(email, updateUserDto);
  }
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Delete(':email')
  remove(@Param('email') email: string) {
    return this.usersService.remove(email);
  }
}
