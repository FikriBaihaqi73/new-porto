import { defineEventHandler, createError } from 'h3';
import prisma from '~/server/utils/prisma';

export default defineEventHandler(async (event) => {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: {
        startDate: 'desc',
      },
    });
    return { status: 200, data: experiences };
  } catch (error: any) {
    console.error("Error fetching experiences:", error);
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Failed to fetch experiences.',
    });
  }
});
