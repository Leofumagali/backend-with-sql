/*
  Warnings:

  - You are about to drop the column `inscricao_cancelada` on the `Curso` table. All the data in the column will be lost.
  - You are about to drop the column `inscrito` on the `Curso` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Curso" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "capa" TEXT NOT NULL,
    "inicio" DATETIME NOT NULL,
    "inscricoes" INTEGER NOT NULL
);
INSERT INTO "new_Curso" ("capa", "descricao", "id", "inicio", "inscricoes", "nome") SELECT "capa", "descricao", "id", "inicio", "inscricoes", "nome" FROM "Curso";
DROP TABLE "Curso";
ALTER TABLE "new_Curso" RENAME TO "Curso";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
