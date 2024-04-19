import React, { useEffect, useState } from 'react';
import apple from "../assets/apple.jpeg";
import carrot from "../assets/carrot.jpeg";
import coconutoil from "../assets/coconutoil.jpeg";
import corns from "../assets/corn.jpeg";
import strawberries from "../assets/strawberries.jpeg";
import tomatoes from "../assets/tomatoes.jpeg";
import PurchaseSummary from './PurchaseSummary';
function Products() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  useEffect(() => {
    // get special products from localStorage
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      const initialProducts = [
        { id: 1, name: 'Strawberries (500g)', discountedprice: 18.00, actualprice: 27.00, image: 'strawberries' },
        { id: 2, name: 'Tomatoes (200g)', discountedprice: 7.00, actualprice: 12.00, image: 'tomatoes' },
        { id: 3, name: 'Coconut Oil (2kg)', discountedprice: 35.00, actualprice: 45.00, image: 'coconutoil' },
        { id: 4, name: 'Apples (1kg)', discountedprice: 12.00, actualprice: 12.00, image: 'apple' },
        { id: 5, name: 'Corns (1kg)', discountedprice: 8.00, actualprice: 8.00, image: 'corns' },
        { id: 6, name: 'Carrots (2kg)', discountedprice: 5.00, actualprice: 5.00, image: 'carrot' }
      ];
      setProducts(initialProducts);
      // store initial products in localStorage
      localStorage.setItem('products', JSON.stringify(initialProducts));
    }
 

    // get cart items from localStorage
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

    // add product into cart
    const addToCart = (product) => {
      // Check if the product already exists in the cart
      const existingProductIndex = cart.findIndex(item => item.id === product.id);
    
      if (existingProductIndex !== -1) {
        // Product already exists in the cart, update its quantity
        const updatedCart = [...cart];
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          quantity: updatedCart[existingProductIndex].quantity + 1
        };
        setCart(updatedCart);
        // Store updated cart items in localStorage
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      } else {
        // Product doesn't exist in the cart, add it
        const updatedCart = [...cart, { ...product, quantity: 1 }];
        setCart(updatedCart);
        // Store updated cart items in localStorage
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      }
    };
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    // Store updated cart items in localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
   // calculate total price of items in the cart
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.discountedprice*item.quantity, 0);
  };

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const backToProducts = () => {
    setShowCheckout(false);
    setShowSummary(false);
    setCart([]);
    setCreditCardNumber('');
    setExpiryDate('');
  }

  const handleConfirmation = (event) => {
    event.preventDefault();

    // credit card validation
    if (!creditCardNumber || !expiryDate) {
      alert('Please fill in all fields.');
      return;
    }
  
    // simple validation that cc number has 16 digits
    const cardNumberRegex = /^[0-9]{16}$/;
    if (!cardNumberRegex.test(creditCardNumber)) {
      alert('Invalid credit card number. Please enter a 16-digit numeric value.');
      return;
    }
  
    // expiry date should be in MM/YY format
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!expiryDateRegex.test(expiryDate)) {
      alert('Invalid expiry date format. Please enter in MM/YY format.');
      return;
    }
  
    setShowCheckout(false);
    setShowSummary(true);
  };

  return (
    //showing special sales of the week
    <div style={{ textAlign: 'center' }}>
      {!showCheckout && !showSummary ? (
        <>
      <h2>Products </h2>
      <div className="specials-container">
        {products.map(product => (
          <div key={product.id} className="product-card" style={{ display: 'inline-block', margin: '30px',textAlign: 'center', 
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '14px', overflow: 'hidden',backgroundColor: '#ffffff',
          transition: 'transform 0.3s ease',cursor: 'pointer'}}>
           {product.image === 'strawberries' && (
  <>
    <img src={strawberries} alt={product.name} style={{ width: '300px', height: '250px'}} />
    <h3>{product.name}</h3>
    <p><b>Discounted Price: AU${product.discountedprice}</b></p>
    <p>Actual Price: AU${product.actualprice}</p>
    <button onClick={() => addToCart(product)}style={{ backgroundColor: '#87A96B',color: '#ffffff',padding: '10px 20px',borderRadius: '5px',
            border: 'none',cursor: 'pointer',transition: 'background-color 0.3s ease',width: '100%',fontSize: '16px',fontWeight: 'bold',boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>Add to Cart</button>
  </>
)}

{product.image === 'tomatoes' && (
  <>
    <img src={tomatoes} alt={product.name} style={{ width: '300px', height: '250px' }} />
    <h3>{product.name}</h3>
    <p><b>Discounted Price: AU${product.discountedprice}</b></p>
    <p>Actual Price: AU${product.actualprice}</p>
    <button onClick={() => addToCart(product)}style={{ backgroundColor: '#87A96B',color: '#ffffff',padding: '10px 20px',borderRadius: '5px',
            border: 'none',cursor: 'pointer',transition: 'background-color 0.3s ease',width: '100%',fontSize: '16px',fontWeight: 'bold',boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>Add to Cart</button>
  </>
)}

{product.image === 'coconutoil' && (
  <>
    <img src={coconutoil} alt={product.name} style={{ width: '300px', height: '250px' }} />
    <h3>{product.name}</h3>
    <p><b>Discounted Price: AU${product.discountedprice}</b></p>
    <p>Actual Price: AU${product.actualprice}</p>
    <button onClick={() => addToCart(product)}style={{ backgroundColor: '#87A96B',color: '#ffffff',padding: '10px 20px',borderRadius: '5px',
            border: 'none',cursor: 'pointer',transition: 'background-color 0.3s ease',width: '100%',fontSize: '16px',fontWeight: 'bold',boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>Add to Cart</button>
  </>
)}

{product.image === 'apple' && (
  <>
    <img src={apple} alt={product.name} style={{ width: '300px', height: '250px' }} />
    <h3>{product.name}</h3>
    <p>Price: AU${product.discountedprice}</p>
    <button onClick={() => addToCart(product)}style={{ backgroundColor: '#87A96B',color: '#ffffff',padding: '10px 20px',borderRadius: '5px',
            border: 'none',cursor: 'pointer',transition: 'background-color 0.3s ease',width: '100%',fontSize: '16px',fontWeight: 'bold',boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>Add to Cart</button>
  </>
)}
{product.image === 'corns' && (
  <>
    <img src={corns} alt={product.name} style={{ width: '300px', height: '250px' }} />
    <h3>{product.name}</h3>
    <p>Price: AU${product.discountedprice}</p>
    <button onClick={() => addToCart(product)}style={{ backgroundColor: '#87A96B',color: '#ffffff',padding: '10px 20px',borderRadius: '5px',
            border: 'none',cursor: 'pointer',transition: 'background-color 0.3s ease',width: '100%',fontSize: '16px',fontWeight: 'bold',boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>Add to Cart</button>
  </>
)}
{product.image === 'carrot' && (
  <>
    <img src={carrot} alt={product.name} style={{ width: '300px', height: '250px' }} />
    <h3>{product.name}</h3>
    <p>Price: AU${product.discountedprice}</p>
    <button onClick={() => addToCart(product)}style={{ backgroundColor: '#87A96B',color: '#ffffff',padding: '10px 20px',borderRadius: '5px',
            border: 'none',cursor: 'pointer',transition: 'background-color 0.3s ease',width: '100%',fontSize: '16px',fontWeight: 'bold',boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>Add to Cart</button>
  </>
)}
          </div>
          
        ))}
        
        <hr />
      </div>
      
      {cart.length > 0 && (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <h2>Shopping Cart</h2>
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
    {cart.map(item => (
  <div key={item.id} style={{ margin: '10px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', width: '200px',height:'400px' }}>
    {item.image === 'strawberries' && <img src={strawberries} alt={item.name} style={{ width: '100%', height: '30%' }} />}
    {item.image === 'tomatoes' && <img src={tomatoes} alt={item.name} style={{ width: '100%', height: '30%' }} />}
    {item.image === 'coconutoil' && <img src={coconutoil} alt={item.name} style={{ width: '100%', height: '30%' }} />}
    {item.image === 'apple' && <img src={apple} alt={item.name} style={{ width: '100%', height: '30%' }} />}
    {item.image === 'corns' && <img src={corns} alt={item.name} style={{ width: '100%', height: '30%' }} />}
    {item.image === 'carrot' && <img src={carrot} alt={item.name} style={{ width: '100%', height: '30%' }} />}

    <h3>{item.name}</h3>
    <p>Price: AU${item.discountedprice}</p>
    <p><b>Quantity: </b>{item.quantity}</p>
    <p>Total Price: AU${item.discountedprice * item.quantity}</p>
    <button onClick={() => removeFromCart(item.id)}>Remove</button>
  </div>
))}
    </div>
    <hr />
    <h3>Total Price: AU${calculateTotalPrice()}</h3>
    <button onClick={handleCheckout} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Proceed to Checkout</button>
  </div>
)}
  </>
      ) : showCheckout ? (
        // checkout with cc card
        <div>
          <h2>Checkout</h2>
          <form onSubmit={handleConfirmation}>
            <label htmlFor="creditCardNumber">Credit Card Number:</label>
            <input type="text" id="creditCardNumber" name="creditCardNumber" value={creditCardNumber} onChange={(e) => setCreditCardNumber(e.target.value)} required />
            <br />
            <label htmlFor="expiryDate">Expiry Date (MM/YY):</label>
            <input type="text" id="expiryDate" name="expiryDate" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required />
            <br />
            <button type="submit">Confirm Purchase</button>
          </form>
          <PurchaseSummary cart={cart} calculateTotalPrice={calculateTotalPrice} />

  </div>
      ) : (
        // summary page
        <div style={{ border: '1px solid', borderRadius: '5px', padding: '20px', margin: '0 auto', textAlign: 'left' }}>
          <h2>Purchase Summary</h2>
          <hr/>
          <ol style={{ padding: '0', textAlign: 'left', margin: '0 auto', paddingLeft: '20px' }}>
            {cart.map(item => (
              <li key={item.id}>{item.name} - AU${item.discountedprice}</li>
            ))}
          </ol>
          <hr/>
          <h3>Total Price Paid: AU${calculateTotalPrice()}</h3>
          <p style={{ fontSize: '20px', marginTop: '10px' }}>Thank you for shopping with us!</p>
          <button onClick={backToProducts} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Back To Products</button>
        </div>
      )}
    </div>
  );
}

export default Products;