-- CreateTable
CREATE TABLE `contracts` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `digest` VARCHAR(191) NOT NULL DEFAULT 'none',
    `dataset` VARCHAR(191) NULL,
    `setPoint` DOUBLE NULL,
    `deviation` DOUBLE NULL,
    `penalty` DOUBLE NULL,
    `checkInterval` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
