import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { urlFor } from '../lib/client';

const Product = ({ product }) => {
  const { image, name, slug, price } = product;
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <img
            className="product-image"
            src={urlFor(image.length && image[0])}
            alt=""
            width={250}
            height={250}
          />
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.object,
};

export default Product;
