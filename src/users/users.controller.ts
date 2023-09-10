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
} from '@nestjs/common';

import { User } from '@prisma/client';
import { UserCreateDto, UserUpdateDto } from './user.dto';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersServices: UsersService) {}

  @Get()
  async getUsers(
    @Query('take', new DefaultValuePipe(100), ParseIntPipe) take: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
  ): Promise<User[]> {
    return await this.usersServices.findMany({ take, skip });
  }

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<null | User> {
    return await this.usersServices.findOne(id);
  }

  @Post()
  async createUser(
    @Body(new ValidationPipe({ whitelist: true })) payload: UserCreateDto,
  ): Promise<User> {
    return await this.usersServices.create(payload);
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(
      new ValidationPipe({ whitelist: true, skipUndefinedProperties: true }),
    )
    payload: UserUpdateDto,
  ): Promise<User> {
    return await this.usersServices.update(id, payload);
  }
}
