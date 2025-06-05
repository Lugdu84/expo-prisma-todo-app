import { PrismaClient } from '@/prisma/generated/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

export const prisma = new PrismaClient({
	datasourceUrl: process.env.DATABASE_URL,
}).$extends(withAccelerate());
