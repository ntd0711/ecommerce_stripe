import React, { createContext, useState, useContext } from 'react';
import { toast } from 'react-hot-toast';
const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };
  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty === 1) return 1;
      return prevQty - 1;
    });
  };
  const onAdd = (product, quantity) => {
    const productInCart = cartItems.find((item) => item._id === product._id);
    setTotalPrice((prevPrice) => prevPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (productInCart) {
      const newItems = cartItems.map((item) => {
        if (item._id === product._id) return { ...item, quantity: item.quantity + quantity };
        return item;
      });
      setCartItems(newItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
    }

    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  const onChangeQtyItem = (id, type) => {
    const item = cartItems.find((item) => item._id === id);
    const indexItem = cartItems.findIndex((item) => item._id === id);
    if (!item || indexItem === -1) return;
    const newCartItems = [...cartItems];
    // newCartItems[indexItem] = item;

    const todos = {
      inc: () => {
        newCartItems[indexItem] = { ...item, quantity: item.quantity + 1 };
        setCartItems(newCartItems);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
        setTotalPrice((prevPrice) => prevPrice + item.price);
      },
      dec: () => {
        if (item.quantity === 1) {
          setCartItems([...newCartItems.filter((item) => item._id !== id)]);
        } else {
          newCartItems[indexItem] = { ...item, quantity: item.quantity - 1 };
          setCartItems(newCartItems);
        }
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
        setTotalPrice((prevPrice) => prevPrice - item.price);
      },
    };

    todos[type]() || null;
  };
  const onRemoveItem = (itemRm) => {
    const itemTotalPrice = itemRm.price * itemRm.quantity;

    setTotalPrice((prevPrice) => prevPrice - itemTotalPrice);
    setCartItems((prevCartItems) => [...prevCartItems.filter((item) => item._id !== itemRm._id)]);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - itemRm.quantity);
  };

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        setQty,
        setShowCart,
        incQty,
        decQty,
        onAdd,
        onChangeQtyItem,
        onRemoveItem,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
