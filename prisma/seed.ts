import { PrismaClient } from '@prisma/client';
import { v4 } from 'uuid';

const prisma = new PrismaClient();
async function main(): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // await prisma.admin.create({
  //   data: {
  //     id: v4(),
  //     email: getEnvOrThrow('SUPERADMIN_FIREBASE_EMAIL'),
  //     name: 'Fern Superadmin',
  //     firebaseUID: getEnvOrThrow('SUPERADMIN_FIREBASE_UID'),
  //     role: 'SUPERADMIN',
  //     enabled: true,
  //     createdBy: '',
  //   },
  // });

  // Add your seed logic here
  // Then run `npx prisma db seed`
}
main()
  .then(async () => {
    console.log('Seeding done');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
