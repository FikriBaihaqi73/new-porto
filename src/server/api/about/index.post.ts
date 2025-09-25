import { defineEventHandler, readBody, createError } from 'h3';
import prisma from '~/lib/prisma';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    // Validasi input di sini (opsional, tapi sangat disarankan)
    if (!body.name || !body.description || !body.stats || !body.skills || !body.tools || !body.level || !body.details) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required fields',
      });
    }

    // Asumsi hanya ada satu entri AboutMe, jadi kita akan membuat atau mengupdate yang pertama
    const aboutMe = await prisma.aboutMe.create({
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
      status: 201,
      message: 'AboutMe data created successfully',
      data: aboutMe,
    };
  } catch (error: any) {
    console.error('Error creating AboutMe data:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to create AboutMe data',
    });
  }
});
