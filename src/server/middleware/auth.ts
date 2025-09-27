import { defineEventHandler, createError } from 'h3';
import jwt from 'jsonwebtoken';

declare module 'h3' {
  interface H3EventContext {
    user?: { userId: string };
  }
}

export default defineEventHandler(async (event) => {
  const publicRouteRegexes = [
    /^\/$/,
    /^\/projects(\/?)$/,
    /^\/projects\/[^/]+(\/?)$/,
    /^\/api\/auth\/login(\/?)$/,
    /^\/api\/about(\/?)$/,
    /^\/login(\/?)$/,
  ];

  const isPublicRoute = publicRouteRegexes.some(regex => regex.test(event.path));

  if (isPublicRoute) {
    return;
  }

  const token = getCookie(event, 'authToken'); // Baca token dari cookie

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as { userId: string };
    event.context.user = decoded;
  } catch (error) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid token',
    });
  }
});
