import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  findOne(id: number): Promise<null | User> {
    return this.prismaService.user.findFirst({
      where: { id },
    });
  }

  findMany(filters: { take: number; skip: number }): Promise<User[]> {
    return this.prismaService.user.findMany({
      take: filters.take || 1000,
      skip: filters.skip || 0,
    });
  }

  create(data): Promise<User> {
    return this.prismaService.user.create({
      data,
    });
  }

  update(id: number, data): Promise<User> {
    return this.prismaService.user.update({
      where: {
        id,
      },
      data,
    });
  }

  delete(id: number): Promise<User> {
    return this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }
}
