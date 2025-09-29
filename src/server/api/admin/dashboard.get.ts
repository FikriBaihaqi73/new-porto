import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
  // The auth middleware will have already set event.context.user if authenticated
  if (!event.context.user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }

  return {
    message: `Welcome to the admin dashboard, User ID: ${event.context.user.userId}`,
  };
});
