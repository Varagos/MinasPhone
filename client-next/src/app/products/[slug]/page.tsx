import React from 'react';

const ProductPage = ({ params }: { params: { slug: string } }) => {
  return <div>MyProduct {params.slug}</div>;
};

export default ProductPage;
