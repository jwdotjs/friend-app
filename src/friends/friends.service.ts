import { Injectable } from '@nestjs/common';
import { UserFriend } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FriendsService {
  constructor(private prismaService: PrismaService) {}

  async getFriends(filters: {
    userId: number;
    take?: number;
    skip?: number;
  }): Promise<UserFriend[]> {
    return this.prismaService.userFriend.findMany({
      where: { userId: filters.userId },
      take: filters.take || 1000,
      skip: filters.skip || 0,
      include: {
        friend: true,
      },
    });
  }

  async getDistance({ userId, friendId }): Promise<number> {
    const rows: { min_distance: number }[] = await this.prismaService.$queryRaw`
      WITH RECURSIVE friends_recursive AS (
        -- Base case: Initialize with direct friendships
        SELECT
          "userId",
          "friendId",
          1 AS distance
        FROM
          "UserFriend"
         WHERE
          ("UserFriend"."userId" = ${userId})
          
        UNION ALL
        
        -- Recursive case: Check for friends of friends
        
        SELECT
          uf."userId",
          uf."friendId",
          distance + 1 AS distance
        FROM
          "UserFriend" uf
        JOIN
          friends_recursive fr
        ON
          (fr."friendId" = uf."userId")
        WHERE
          distance < 5
      )
      SELECT
        min(distance) as min_distance
      FROM
        friends_recursive
      WHERE "friendId" = ${friendId};
    `;

    if (rows?.length > 0) {
      return rows[0].min_distance;
    }

    return null;
  }
}
