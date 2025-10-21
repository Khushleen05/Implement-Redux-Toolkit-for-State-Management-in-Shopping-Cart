import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, updateQuantity } from './cartSlice';
import './styles.css';

const products = [
  { name: 'Laptop', price: 1200 },
  { name: 'Mouse', price: 25 },
  { name: 'Keyboard', price: 45 },
];

export default function App() {
  const cart = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch();

  return (
    <div className="container">
      <h1>My Shop</h1>
      <h2>Products</h2>
      <div className="product-list">
        {products.map(p => (
          <div key={p.name} className="product-card">
            <h3>{p.name}</h3>
            <p>${p.price}</p>
            <button onClick={() => dispatch(addToCart(p))}>Add to Cart</button>
          </div>
        ))}
      </div>

      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        cart.map(item => (
          <div key={item.name} className="cart-item">
            <span>{item.name} (${item.price})</span>
            <input
              type="number"
              value={item.quantity}
              min="1"
              onChange={e =>
                dispatch(updateQuantity({ name: item.name, quantity: Number(e.target.value) }))
              }
            />
            <button onClick={() => dispatch(removeFromCart(item.name))}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
}
