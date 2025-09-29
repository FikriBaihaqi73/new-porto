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

    await prisma.project.delete({
      where: { id: projectId },
    });

    return { status: 204, message: 'Project deleted successfully' };
  } catch (error: any) {
    console.error("Error deleting project:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to delete project',
    });
  }
});
