import path from 'path';
import type { PrismaConfig } from 'prisma';

export default {
  schema: path.join(process.cwd(), 'prisma'),
} satisfies PrismaConfig;
