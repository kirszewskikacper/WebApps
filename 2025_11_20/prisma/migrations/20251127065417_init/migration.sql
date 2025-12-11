-- CreateTable
CREATE TABLE `Wpis` (
    `id_wpis` INTEGER NOT NULL AUTO_INCREMENT,
    `DataWpisu` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `OstAktual` DATETIME(3) NOT NULL,
    `Autor` VARCHAR(63) NOT NULL,
    `Tytul` VARCHAR(127) NOT NULL,
    `Zawartosc` TEXT NOT NULL,
    `KatId` INTEGER NOT NULL,

    PRIMARY KEY (`id_wpis`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kategoria` (
    `id_kat` INTEGER NOT NULL AUTO_INCREMENT,
    `NazwaKat` ENUM('Artykul_biologiczny', 'Artykul_naukowy', 'Blog', 'Newsy', 'Opowiadanie') NOT NULL,

    PRIMARY KEY (`id_kat`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Komentarz` (
    `id_kom` INTEGER NOT NULL AUTO_INCREMENT,
    `DataKom` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `AutorKom` VARCHAR(255) NOT NULL,
    `Zawartosc` VARCHAR(191) NULL,
    `WpisId` INTEGER NOT NULL,

    PRIMARY KEY (`id_kom`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Wpis` ADD CONSTRAINT `Wpis_KatId_fkey` FOREIGN KEY (`KatId`) REFERENCES `Kategoria`(`id_kat`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Komentarz` ADD CONSTRAINT `Komentarz_WpisId_fkey` FOREIGN KEY (`WpisId`) REFERENCES `Wpis`(`id_wpis`) ON DELETE RESTRICT ON UPDATE CASCADE;
