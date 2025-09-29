import { defineEventHandler, readBody, createError } from 'h3';
import prisma from '~/server/utils/prisma';

export default defineEventHandler(async (event) => {
  const experienceId = event.context.params?.id;

  if (!experienceId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Experience ID is required.',
    });
  }

  try {
    const body = await readBody(event);
    const {
      companyName,
      jobTitle,
      location,
      startDate,
      endDate,
      status,
      duration,
      mainAchievement,
      skillsAcquired,
      projectsCount,
      logoUrl,
    } = body;

    const updatedExperience = await prisma.experience.update({
      where: {
        id: experienceId,
      },
      data: {
        companyName,
        jobTitle,
        location,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : null,
        status,
        duration,
        mainAchievement,
        skillsAcquired,
        projectsCount: projectsCount !== undefined ? projectsCount : 0,
        logoUrl,
      },
    });

    return { status: 200, data: updatedExperience };
  } catch (error: any) {
    console.error(`Error updating Experience entry with ID ${experienceId}:`, error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to update Experience entry.',
    });
  }
});
