-- CreateTable
CREATE TABLE "localizacoes" (
    "id" SERIAL NOT NULL,
    "uf" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,

    CONSTRAINT "localizacoes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "localizacoes_uf_key" ON "localizacoes"("uf");
