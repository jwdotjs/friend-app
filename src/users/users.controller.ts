import {
  Controller,
  Get,
  Post,
  Patch,
  Query,
  Param,
  ParseIntPipe,
  DefaultValuePipe,
  Body,
  ValidationPipe,
  Delete,
} from '@nestjs/common';

import { User } from '@prisma/client';
import { UserCreateDto, UserUpdateDto } from './user.dto';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersServices: UsersService) {}

  @Get()
  getUsers(
    @Query('take', new DefaultValuePipe(100), ParseIntPipe) take: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
  ): Promise<User[]> {
    return this.usersServices.findMany({ take, skip });
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number): Promise<null | User> {
    return this.usersServices.findOne(id);
  }

  @Post()
  createUser(
    @Body(new ValidationPipe({ whitelist: true })) payload: UserCreateDto,
  ): Promise<User> {
    // Future work: validate the email is unique or return a 409
    // Note: email isn't marked as unique in the Prisma schema for simplicity purposes
    return this.usersServices.create(payload);
  }

  @Patch(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(
      new ValidationPipe({ whitelist: true, skipUndefinedProperties: true }),
    )
    payload: UserUpdateDto,
  ): Promise<User> {
    // Future work: validate the user exists or return a 404
    return this.usersServices.update(id, payload);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    // Future work: validate the user exists or return a 404
    return this.usersServices.delete(id);
  }
}
