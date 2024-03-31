/*
  Warnings:

  - You are about to drop the column `cidade_id` on the `localizacoes` table. All the data in the column will be lost.
  - You are about to drop the `cidades` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cidade` to the `localizacoes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cidades" DROP CONSTRAINT "cidades_ufId_fkey";

-- DropForeignKey
ALTER TABLE "localizacoes" DROP CONSTRAINT "localizacoes_cidade_id_fkey";

-- AlterTable
ALTER TABLE "localizacoes" DROP COLUMN "cidade_id",
ADD COLUMN     "cidade" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "orgs" ADD COLUMN     "uf_id" INTEGER;

-- DropTable
DROP TABLE "cidades";

-- AddForeignKey
ALTER TABLE "orgs" ADD CONSTRAINT "orgs_uf_id_fkey" FOREIGN KEY ("uf_id") REFERENCES "ufs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
