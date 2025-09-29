import { defineEventHandler, readBody, createError } from 'h3';
import prisma from '~/server/utils/prisma';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { name, url, svgPath } = body;

    if (!name || !url) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required fields: name and url.',
      });
    }

    const newSocialMediaLink = await prisma.socialMedia.create({
      data: {
        name,
        url,
        svgPath,
      },
    });

    return { status: 201, data: newSocialMediaLink };
  } catch (error: any) {
    console.error("Error creating social media link:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to create social media link.',
    });
  }
});
