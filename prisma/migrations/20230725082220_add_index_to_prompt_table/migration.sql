-- DropIndex
DROP INDEX "Prompt_userId_key";

-- CreateIndex
CREATE INDEX "Prompt_userId_idx" ON "Prompt"("userId");
