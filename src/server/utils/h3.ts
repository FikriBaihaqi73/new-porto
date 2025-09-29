import { ofetch } from 'ofetch';
import { createError } from 'h3';

export async function fetchWithErrorHandler<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await ofetch<T>(url, options);
    return response;
  } catch (error: any) {
    console.error(`Error fetching from ${url}:`, error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'An unexpected error occurred',
      data: error.data,
    });
  }
}
