import Image from 'next/image';
import Link from 'next/link';

import { Product } from '@/api/types/products';
import { formatPriceWithSymbol } from '@/utils/prices';
import AddToCartProductButton from './AddToCartProductButton';

type ProductProps = {
  product: Product;
  // Whether the product is displayed from a category
  fromCategory: string | null;
};

function ProductCard({ product, fromCategory }: ProductProps) {
  return (
    <div className="flex flex-col justify-between border-2 border-gray-300 rounded-2xl p-4 transition-all duration-300 w-full h-[380px] hover:shadow-xl hover:translate-y-[-4px] hover:border-primary">
      <Link
        href={
          fromCategory
            ? `/products/${product.id}?from=${fromCategory}`
            : `/products/${product.id}`
        }
        className="pt-2"
      >
        <div className="flex justify-center h-[200px] w-full">
          {/* Small: Thumbnails */}
          <Image
            src={product.imageUrl}
            width={200}
            height={200}
            className="object-contain w-auto h-full"
            alt={product.name}
          />
        </div>
      </Link>
      <div className="px-0 pb-0">
        <div>
          <Link href={`/products/${product.id}`} className="no-underline">
            <p className="block text-muted-foreground mb-2 h-[50px] w-full line-clamp-2 break-all overflow-hidden">
              {product.name}
            </p>
          </Link>
          <div className="flex justify-between items-center">
            <p className="text-success font-semibold text-xl">
              {formatPriceWithSymbol(product.price)}
            </p>
            <AddToCartProductButton productId={product.id} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
