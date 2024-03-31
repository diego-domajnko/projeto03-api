/*
  Warnings:

  - You are about to drop the column `uf_id` on the `localizacoes` table. All the data in the column will be lost.
  - Added the required column `uf` to the `localizacoes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "localizacoes" DROP CONSTRAINT "localizacoes_uf_id_fkey";

-- AlterTable
ALTER TABLE "localizacoes" DROP COLUMN "uf_id",
ADD COLUMN     "uf" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "localizacoes" ADD CONSTRAINT "localizacoes_uf_fkey" FOREIGN KEY ("uf") REFERENCES "ufs"("uf") ON DELETE RESTRICT ON UPDATE CASCADE;
