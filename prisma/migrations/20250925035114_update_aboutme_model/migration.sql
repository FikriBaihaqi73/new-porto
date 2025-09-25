-- CreateTable
CREATE TABLE "public"."AboutMe" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profilePictureUrl" TEXT,
    "level" INTEGER NOT NULL,
    "details" JSONB NOT NULL,
    "description" TEXT NOT NULL,
    "stats" JSONB NOT NULL,
    "skills" JSONB NOT NULL,
    "tools" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AboutMe_pkey" PRIMARY KEY ("id")
);
