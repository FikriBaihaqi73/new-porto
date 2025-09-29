import { defineEventHandler, createError } from 'h3';
import prisma from '~/server/utils/prisma';

export default defineEventHandler(async (event) => {
  const experienceId = event.context.params?.id;

  if (!experienceId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Experience ID is required.',
    });
  }

  try {
    const experience = await prisma.experience.findUnique({
      where: {
        id: experienceId,
      },
    });

    if (!experience) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Experience entry not found.',
      });
    }

    return { status: 200, data: experience };
  } catch (error: any) {
    console.error(`Error fetching Experience entry with ID ${experienceId}:`, error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to fetch Experience entry.',
    });
  }
});
