import React, { useEffect } from 'react';
import { fetchProductsByCategorySlug } from '../../redux/slices/products';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import Products from '@/components/Category/Products/Products';
import { useRouter } from 'next/router';
import Spinner from '@/components/Spinner/Spinner';

const Category = () => {
  // console.log('Product params', params);
  const router = useRouter();
  const { categorySlug } = router.query;
  // console.log(categorySlug);
  if (typeof categorySlug !== 'string') return <div>Category not found</div>;

  const products = useAppSelector((state) => state.products.data);
  const productsStatus = useAppSelector((state) => state.products.status);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // console.log('categorySlug changed', categorySlug);
    if (categorySlug) {
      dispatch(fetchProductsByCategorySlug(categorySlug));
    }
  }, [categorySlug]);

  return productsStatus === 'loading' ? (
    <Spinner />
  ) : (
    <Products products={products} />
  );
  // return productsLoading ? <Spinner /> : <Products products={products} />;
};

export default Category;
