import { defineEventHandler, createError, getRouterParam } from 'h3';
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

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Project not found',
      });
    }

    return { status: 200, data: project };
  } catch (error: any) {
    console.error("Error fetching project:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to fetch project',
    });
  }
});
