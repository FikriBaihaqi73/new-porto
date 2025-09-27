import { defineEventHandler } from 'h3';
import prisma from '~/server/utils/prisma';

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const featuredOnly = query.featured === 'true';

    const projects = await prisma.project.findMany({
      where: featuredOnly ? { featured: true } : {},
      orderBy: { createdAt: 'asc' },
    });

    return { status: 200, data: projects };
  } catch (error: any) {
    console.error("Error fetching projects:", error);
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Failed to fetch projects',
    });
  }
});
