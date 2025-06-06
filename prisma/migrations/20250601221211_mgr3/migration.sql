/*
  Warnings:

  - You are about to drop the column `total_price` on the `carts` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `order_items` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "carts" DROP COLUMN "total_price";

-- AlterTable
ALTER TABLE "order_items" DROP COLUMN "price";
