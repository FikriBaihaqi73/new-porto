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
    const socialMediaLink = await prisma.socialMedia.findUnique({
      where: {
        id: linkId,
      },
    });

    if (!socialMediaLink) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Social media link not found.',
      });
    }

    return { status: 200, data: socialMediaLink };
  } catch (error: any) {
    console.error(`Error fetching social media link with ID ${linkId}:`, error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to fetch social media link.',
    });
  }
});
