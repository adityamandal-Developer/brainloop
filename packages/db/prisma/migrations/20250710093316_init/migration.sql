/*
  Warnings:

  - You are about to drop the column `promptId` on the `Chat` table. All the data in the column will be lost.
  - Added the required column `chatId` to the `Prompt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prompt` to the `Prompt` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_promptId_fkey";

-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "promptId";

-- AlterTable
ALTER TABLE "Prompt" ADD COLUMN     "Answer" TEXT[],
ADD COLUMN     "chatId" TEXT NOT NULL,
ADD COLUMN     "prompt" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Prompt" ADD CONSTRAINT "Prompt_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
