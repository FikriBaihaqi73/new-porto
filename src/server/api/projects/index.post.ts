import { defineEventHandler, readBody } from 'h3';
import prisma from '~/server/utils/prisma';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { title, description, image, type, status, progress, techStack, liveUrl, githubUrl, featured } = body;

    if (!title || !description || !image || !type || !status || progress === undefined || !techStack) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required project fields',
      });
    }

    const newProject = await prisma.project.create({
      data: {
        title,
        description,
        image,
        type,
        status,
        progress,
        techStack,
        liveUrl,
        githubUrl,
        featured: featured || false,
      },
    });

    return { status: 201, data: newProject };
  } catch (error: any) {
    console.error("Error creating project:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to create project',
    });
  }
});
