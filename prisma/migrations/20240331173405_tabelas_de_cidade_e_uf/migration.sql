/*
  Warnings:

  - You are about to drop the column `cidade` on the `localizacoes` table. All the data in the column will be lost.
  - You are about to drop the column `uf` on the `localizacoes` table. All the data in the column will be lost.
  - Added the required column `cidade_id` to the `localizacoes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uf_id` to the `localizacoes` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "localizacoes_uf_key";

-- AlterTable
ALTER TABLE "localizacoes" DROP COLUMN "cidade",
DROP COLUMN "uf",
ADD COLUMN     "cidade_id" INTEGER NOT NULL,
ADD COLUMN     "uf_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "cidades" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "ufId" INTEGER,

    CONSTRAINT "cidades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ufs" (
    "id" SERIAL NOT NULL,
    "uf" TEXT NOT NULL,

    CONSTRAINT "ufs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ufs_uf_key" ON "ufs"("uf");

-- AddForeignKey
ALTER TABLE "localizacoes" ADD CONSTRAINT "localizacoes_uf_id_fkey" FOREIGN KEY ("uf_id") REFERENCES "ufs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "localizacoes" ADD CONSTRAINT "localizacoes_cidade_id_fkey" FOREIGN KEY ("cidade_id") REFERENCES "cidades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cidades" ADD CONSTRAINT "cidades_ufId_fkey" FOREIGN KEY ("ufId") REFERENCES "ufs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
