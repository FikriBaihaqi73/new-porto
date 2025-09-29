import { defineEventHandler, createError } from 'h3';
import prisma from '~/server/utils/prisma';

export default defineEventHandler(async () => {
  try {
    const socialMediaLinks = await prisma.socialMedia.findMany({
      orderBy: {
        name: 'asc',
      },
    });
    return { status: 200, data: socialMediaLinks };
  } catch (error: any) {
    console.error("Error fetching social media links:", error);
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Failed to fetch social media links.',
    });
  }
});
