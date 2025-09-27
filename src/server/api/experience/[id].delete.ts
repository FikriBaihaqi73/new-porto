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
    await prisma.experience.delete({
      where: {
        id: experienceId,
      },
    });

    return { status: 204, message: 'Experience entry deleted successfully.' };
  } catch (error: any) {
    console.error(`Error deleting Experience entry with ID ${experienceId}:`, error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to delete Experience entry.',
    });
  }
});
