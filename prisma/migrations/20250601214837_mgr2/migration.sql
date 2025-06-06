/*
  Warnings:

  - Added the required column `amount` to the `cart_items` table without a default value. This is not possible if the table is not empty.
  - Made the column `cart_id` on table `cart_items` required. This step will fail if there are existing NULL values in that column.
  - Made the column `product_name` on table `cart_items` required. This step will fail if there are existing NULL values in that column.
  - Made the column `color_name` on table `cart_items` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `price` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_cart_id_fkey";

-- DropForeignKey
ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_color_name_fkey";

-- DropForeignKey
ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_product_name_fkey";

-- AlterTable
ALTER TABLE "cart_items" ADD COLUMN     "amount" INTEGER NOT NULL,
ALTER COLUMN "cart_id" SET NOT NULL,
ALTER COLUMN "product_name" SET NOT NULL,
ALTER COLUMN "color_name" SET NOT NULL;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "price" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_product_name_fkey" FOREIGN KEY ("product_name") REFERENCES "products"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_color_name_fkey" FOREIGN KEY ("color_name") REFERENCES "colors"("name") ON DELETE CASCADE ON UPDATE CASCADE;
