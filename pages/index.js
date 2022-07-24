import React from 'react';
import { HeroBanner, FooterBanner, Footer, Product } from '../components';
import { client } from '../lib/client';
import PropTypes from 'prop-types';

const Home = (props) => {
  const { products = [], banner = [] } = props;
  return (
    <>
      <HeroBanner heroBanner={banner.length && banner[0]} />
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>speaker There are many variations passages</p>
      </div>
      <div className="products-container">
        {products.map((product) => (
          <Product key={product?._id} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={banner.length && banner[0]} />
    </>
  );
};

export const getServerSideProps = async () => {
  const productQuery = '*[_type == "product"]';
  const products = await client.fetch(productQuery);

  const bannerQuery = '*[_type == "banner"]';
  const banner = await client.fetch(bannerQuery);

  return {
    props: { products, banner },
  };
};

Home.propTypes = {
  products: PropTypes.array,
  banner: PropTypes.array,
};

export default Home;
