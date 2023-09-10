import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { FriendsModule } from './friends/friends.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [PrismaModule, FriendsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
