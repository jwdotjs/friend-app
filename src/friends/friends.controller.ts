import {
  Controller,
  Get,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { UserFriend } from '@prisma/client';
import { ordinalize } from 'inflection';

import { FriendsService } from './friends.service';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Get()
  async getFriends(
    @Query('userId', ParseIntPipe) userId: number,
    @Query('take', new DefaultValuePipe(100), ParseIntPipe) take: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
  ): Promise<UserFriend[]> {
    return await this.friendsService.getFriends({ userId, take, skip });
  }

  @Get('distance')
  async getDistance(
    @Query('userId', ParseIntPipe) userId: number,
    @Query('friendId', ParseIntPipe) friendId: number,
  ): Promise<{ distance: null | string; message: string }> {
    const distance = await this.friendsService.getDistance({
      userId,
      friendId,
    });

    return distance
      ? { message: 'success', distance: ordinalize(distance.toString()) }
      : { message: 'distance exceeded max depth or is 0', distance: null };
  }
}
