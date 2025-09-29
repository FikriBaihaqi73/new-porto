import { defineEventHandler, readBody, createError, getRouterParam } from 'h3';
import prisma from '~/server/utils/prisma';

export default defineEventHandler(async (event) => {
  try {
    const projectId = getRouterParam(event, 'id');

    if (!projectId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Project ID is required',
      });
    }

    const body = await readBody(event);
    const { title, description, image, type, status, progress, techStack, liveUrl, githubUrl, featured } = body;

    const updatedProject = await prisma.project.update({
      where: { id: projectId },
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
        featured,
      },
    });

    return { status: 200, data: updatedProject };
  } catch (error: any) {
    console.error("Error updating project:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to update project',
    });
  }
});
