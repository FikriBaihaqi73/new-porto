import { defineEventHandler, createError } from 'h3';
import prisma from '~/server/utils/prisma';

export default defineEventHandler(async (event) => {
  const linkId = event.context.params?.id;

  if (!linkId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Social media link ID is required.',
    });
  }

  try {
    await prisma.socialMedia.delete({
      where: {
        id: linkId,
      },
    });

    return { status: 204, message: 'Social media link deleted successfully.' };
  } catch (error: any) {
    console.error(`Error deleting social media link with ID ${linkId}:`, error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to delete social media link.',
    });
  }
});
