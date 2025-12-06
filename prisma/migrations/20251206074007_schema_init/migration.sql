/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "RangerColor" AS ENUM ('GREEN', 'AMBER', 'RED', 'BLACK');

-- CreateEnum
CREATE TYPE "MessageRole" AS ENUM ('SYSTEM', 'RANGER', 'WATCHTOWER');

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Ranger" (
    "id" TEXT NOT NULL,
    "callSign" TEXT NOT NULL,
    "color" "RangerColor" NOT NULL DEFAULT 'GREEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ranger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IntelDocument" (
    "id" TEXT NOT NULL,
    "rangerId" TEXT,
    "title" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "storagePath" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "sizeBytes" INTEGER NOT NULL,
    "ingestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IntelDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VectorRef" (
    "id" TEXT NOT NULL,
    "docId" TEXT NOT NULL,
    "pineconeId" TEXT NOT NULL,
    "namespace" TEXT,
    "chunkIndex" INTEGER,
    "page" INTEGER,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VectorRef_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatWindow" (
    "id" TEXT NOT NULL,
    "rangerId" TEXT NOT NULL,
    "title" TEXT,
    "rootDocId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChatWindow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatMessage" (
    "id" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,
    "role" "MessageRole" NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "docId" TEXT,
    "context" JSONB,

    CONSTRAINT "ChatMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ranger_callSign_key" ON "Ranger"("callSign");

-- CreateIndex
CREATE UNIQUE INDEX "VectorRef_pineconeId_key" ON "VectorRef"("pineconeId");

-- CreateIndex
CREATE INDEX "VectorRef_docId_idx" ON "VectorRef"("docId");

-- CreateIndex
CREATE INDEX "ChatWindow_rangerId_createdAt_idx" ON "ChatWindow"("rangerId", "createdAt");

-- CreateIndex
CREATE INDEX "ChatMessage_chatId_createdAt_idx" ON "ChatMessage"("chatId", "createdAt");

-- AddForeignKey
ALTER TABLE "IntelDocument" ADD CONSTRAINT "IntelDocument_rangerId_fkey" FOREIGN KEY ("rangerId") REFERENCES "Ranger"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VectorRef" ADD CONSTRAINT "VectorRef_docId_fkey" FOREIGN KEY ("docId") REFERENCES "IntelDocument"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatWindow" ADD CONSTRAINT "ChatWindow_rangerId_fkey" FOREIGN KEY ("rangerId") REFERENCES "Ranger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatWindow" ADD CONSTRAINT "ChatWindow_rootDocId_fkey" FOREIGN KEY ("rootDocId") REFERENCES "IntelDocument"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "ChatWindow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_docId_fkey" FOREIGN KEY ("docId") REFERENCES "IntelDocument"("id") ON DELETE SET NULL ON UPDATE CASCADE;
