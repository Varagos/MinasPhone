import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import Products from "./Products/Products";

const Category = ({ products, fetchProducts, productsLoading, onAddToCart }) => {
  let { category_id: categoryId } = useParams();
  console.log(categoryId);

  useEffect(() => {
    fetchProducts(categoryId);
  }, [categoryId]);

  return productsLoading ? <Spinner /> : <Products products={products} onAddToCart={onAddToCart} />;
};

export default Category;
