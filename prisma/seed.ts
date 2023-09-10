import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

function generateFriendId(userIds, ignoredUserIds): number {
  // Filters the `userIds` array down to only the ids that are not in the `ignoredUserIds` array
  // then chooses a random `userId` from that filtered array.
  return faker.helpers.arrayElement(
    userIds.filter(
      (id) => !ignoredUserIds.some((ignoredId) => ignoredId === id),
    ),
  );
}

async function main() {
  await prisma.$queryRaw`TRUNCATE TABLE "User" CASCADE;`;
  await prisma.$queryRaw`ALTER SEQUENCE "User_id_seq" RESTART WITH 1;`;

  const userIds = [];

  // First we generate 5,000 random users
  for (let i = 0; i < 5000; i++) {
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
      },
    });

    userIds.push(user.id);
  }

  // For each of those 5,000 users, we then generate 3 friends ensuring we don't friend ourself and
  // that we don't friend the same user twice. This will generate 15,000 user_friends records total.
  userIds.forEach(async (userId) => {
    const ignoredUserIds = [userId];

    for (let i = 0; i < 5; i++) {
      const friendId: number = generateFriendId(userIds, ignoredUserIds);
      await prisma.userFriend.create({
        data: {
          userId,
          friendId,
        },
      });
      ignoredUserIds.push(friendId);
    }
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
