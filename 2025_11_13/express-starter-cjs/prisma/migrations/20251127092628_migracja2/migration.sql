/*
  Warnings:

  - Added the required column `id_Wpis` to the `Komentarz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_Kategoria` to the `Wpis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `komentarz` ADD COLUMN `id_Wpis` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `wpis` ADD COLUMN `id_Kategoria` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Wpis` ADD CONSTRAINT `Wpis_id_Kategoria_fkey` FOREIGN KEY (`id_Kategoria`) REFERENCES `Kategoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Komentarz` ADD CONSTRAINT `Komentarz_id_Wpis_fkey` FOREIGN KEY (`id_Wpis`) REFERENCES `Wpis`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
