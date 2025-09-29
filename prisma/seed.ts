import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.SEED_USER_EMAIL;
  const password = process.env.SEED_USER_PASSWORD;
  const name = process.env.SEED_USER_NAME;

  console.log('Seed script running...');
  console.log('Environment variables:', { email, password: password ? '******' : undefined, name });

  if (!email || !password || !name) {
    console.error('Missing SEED_USER_EMAIL, SEED_USER_PASSWORD, or SEED_USER_NAME in .env');
    process.exit(1);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email: email },
    update: { name: name, password: hashedPassword },
    create: {
      email: email,
      name: name,
      password: hashedPassword,
    },
  });

  console.log(`Created/updated user with email: ${user.email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
