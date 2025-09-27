import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const users = await prisma.user.findMany()
    return users
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch users',
      data: error,
    })
  }
})
