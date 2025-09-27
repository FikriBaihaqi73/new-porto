import { defineEventHandler } from 'h3';
import prisma from '~/server/utils/prisma';

export default defineEventHandler(async () => {
  try {
    // Mencari data AboutMe pertama. Asumsi hanya ada satu entri untuk AboutMe.
    const aboutMe = await prisma.aboutMe.findFirst();

    if (!aboutMe) {
      return {
        status: 404,
        message: 'AboutMe data not found',
      };
    }

    return {
      status: 200,
      data: aboutMe,
    };
  } catch (error) {
    console.error('Error fetching AboutMe data:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch AboutMe data',
    });
  }
});
