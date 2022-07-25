import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';
import { useStateContext } from '../context/StateContext';
import Cart from './Cart';
import Image from 'next/image';

const Navbar = (props) => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  return (
    <div className="navbar-container">
      <Link href="/">
        <a className="logo">
          <Image src={require('../public/favicon.ico')} height={50} width={50} alt="logo" />
          <span>Headphones Store</span>
        </a>
      </Link>

      <button className="cart-icon" onClick={() => setShowCart(true)} type="button">
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>
      {showCart && <Cart />}
    </div>
  );
};

Navbar.propTypes = {};

export default Navbar;
