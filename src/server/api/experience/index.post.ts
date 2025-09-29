import { defineEventHandler, readBody, createError } from 'h3';
import prisma from '~/server/utils/prisma';

export default defineEventHandler(async (event) => {
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

    if (
      !companyName ||
      !jobTitle ||
      !location ||
      !startDate ||
      !status ||
      !duration ||
      !mainAchievement ||
      !skillsAcquired
    ) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required fields for Experience entry.',
      });
    }

    const newExperience = await prisma.experience.create({
      data: {
        companyName,
        jobTitle,
        location,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        status,
        duration,
        mainAchievement,
        skillsAcquired,
        projectsCount: projectsCount || 0,
        logoUrl,
      },
    });

    return { status: 201, data: newExperience };
  } catch (error: any) {
    console.error("Error creating experience:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to create experience entry.',
    });
  }
});
