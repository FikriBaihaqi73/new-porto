import { defineEventHandler, readBody } from 'h3';
import bcrypt from 'bcrypt';
import jwt, { type SignOptions } from 'jsonwebtoken';
import prisma from '~/server/utils/prisma'
// Optional: if using Prisma Accelerate
// import { withAccelerate } from "@prisma/extension-accelerate";

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);

  // const prisma = usePrismaClient();
  // If using Prisma Accelerate, uncomment the line below:
  // const prisma = usePrismaClient().$extends(withAccelerate());

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email and password are required',
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials',
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials',
    });
  }

  const secret: string = process.env.JWT_SECRET || 'your-secret-key';
  const options: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN || '1h') as SignOptions['expiresIn']
  };

  const token = jwt.sign(
    { userId: user.id },
    secret,
    options
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  };
});
