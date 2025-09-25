import { defineEventHandler, readBody, createError } from 'h3';
import prisma from '~/lib/prisma';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const id = getRouterParam(event, 'id'); // Menggunakan getRouterParam untuk mengambil ID dari URL

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing AboutMe ID',
      });
    }

    const updatedAboutMe = await prisma.aboutMe.update({
      where: { id: id },
      data: {
        name: body.name,
        profilePictureUrl: body.profilePictureUrl || null,
        level: body.level,
        details: body.details,
        description: body.description,
        stats: body.stats,
        skills: body.skills,
        tools: body.tools,
      },
    });

    return {
      status: 200,
      message: 'AboutMe data updated successfully',
      data: updatedAboutMe,
    };
  } catch (error: any) {
    console.error('Error updating AboutMe data:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to update AboutMe data',
    });
  }
});
