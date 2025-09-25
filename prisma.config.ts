import path from 'path';
import type { PrismaConfig } from 'prisma';
import 'dotenv/config'; // Import dotenv/config untuk memuat variabel lingkungan

export default {
  schema: path.join(process.cwd(), 'prisma'),
} satisfies PrismaConfig;
