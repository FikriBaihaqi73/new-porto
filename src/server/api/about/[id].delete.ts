import { defineEventHandler, createError } from 'h3';
import prisma from '~/lib/prisma';

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id'); // Menggunakan getRouterParam untuk mengambil ID dari URL

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing AboutMe ID',
      });
    }

    await prisma.aboutMe.delete({
      where: { id: id },
    });

    return {
      status: 204,
      message: 'AboutMe data deleted successfully',
    };
  } catch (error: any) {
    console.error('Error deleting AboutMe data:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to delete AboutMe data',
    });
  }
});
