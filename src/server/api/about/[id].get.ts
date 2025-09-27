import { defineEventHandler, createError } from 'h3';
import prisma from '~/server/utils/prisma';

export default defineEventHandler(async (event) => {
  const aboutMeId = event.context.params?.id;

  if (!aboutMeId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'About Me ID is required.',
    });
  }

  try {
    const aboutMe = await prisma.aboutMe.findUnique({
      where: {
        id: aboutMeId,
      },
    });

    if (!aboutMe) {
      throw createError({
        statusCode: 404,
        statusMessage: 'About Me entry not found.',
      });
    }

    return { status: 200, data: aboutMe };
  } catch (error: any) {
    console.error(`Error fetching About Me entry with ID ${aboutMeId}:`, error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to fetch About Me entry.',
    });
  }
});
