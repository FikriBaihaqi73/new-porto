import { defineEventHandler, readBody, createError } from 'h3';
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
    const body = await readBody(event);
    const { name, url, svgPath } = body;

    const updatedLink = await prisma.socialMedia.update({
      where: {
        id: linkId,
      },
      data: {
        name,
        url,
        svgPath,
      },
    });

    return { status: 200, data: updatedLink };
  } catch (error: any) {
    console.error(`Error updating social media link with ID ${linkId}:`, error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to update social media link.',
    });
  }
});
