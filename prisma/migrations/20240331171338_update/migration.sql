/*
  Warnings:

  - You are about to drop the column `localizacaoId` on the `orgs` table. All the data in the column will be lost.
  - Added the required column `localizacao_id` to the `orgs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orgs" DROP CONSTRAINT "orgs_localizacaoId_fkey";

-- AlterTable
ALTER TABLE "orgs" DROP COLUMN "localizacaoId",
ADD COLUMN     "localizacao_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "orgs" ADD CONSTRAINT "orgs_localizacao_id_fkey" FOREIGN KEY ("localizacao_id") REFERENCES "localizacoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
