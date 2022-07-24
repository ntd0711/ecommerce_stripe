import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { client, urlFor } from '../../lib/client';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';
import { useRouter } from 'next/router';

const ProductDetails = ({ product = {}, products = [] }) => {
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);
  const { qty, setQty, decQty, incQty, onAdd, setShowCart } = useStateContext();
  const router = useRouter();

  useEffect(() => {
    setQty(1);
  }, [router.query.slug, setQty]);

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  };

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img className="product-detail-image" src={image && urlFor(image[index])} alt="" />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                key={item._key}
                src={urlFor(item)}
                className={`small-image ${i === index && 'selected-image'}`}
                onMouseEnter={() => setIndex(i)}
                alt=""
              />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>20</p>
          </div>
          <h4>Detail: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button className="add-to-cart" type="button" onClick={() => onAdd(product, qty)}>
              Add to Cart
            </button>
            <button className="buy-now" type="button" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`;
  const products = await client.fetch(query);
  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));
  console.log('static paths product run');
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const productQuery = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';
  console.log('static props product run');
  const product = await client.fetch(productQuery);
  const products = await client.fetch(productsQuery);

  return {
    props: { product, products },
  };
};

ProductDetails.propTypes = {
  product: PropTypes.object,
  products: PropTypes.array,
};

export default ProductDetails;
