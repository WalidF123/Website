import React, { useEffect, useState } from 'react';
import coconutoil from "../assets/coconutoil.jpeg";
import strawberries from "../assets/strawberries.jpeg";
import tomatoes from "../assets/tomatoes.jpeg";

function Products() {
  const [specialProducts, setSpecialProducts] = useState([]);

  useEffect(() => {
    // Retrieve special products from localStorage
    const storedSpecialProducts = localStorage.getItem('specialProducts');
    if (storedSpecialProducts) {
      setSpecialProducts(JSON.parse(storedSpecialProducts));
    } else {
      const initialSpecialProducts = [
        { id: 1, name: 'Organic Strawberries', discountedprice: 18.00, actualprice: 27.00, image: 'strawberries' },
        { id: 2, name: 'Organic Tomatoes', discountedprice: 7.00, actualprice: 12.00, image: 'tomatoes' },
        { id: 3, name: 'Organic Coconut Oil', discountedprice: 35.00, actualprice: 45.00, image: 'coconutoil' }
      ];
      setSpecialProducts(initialSpecialProducts);
      // Store initial special products in localStorage
      localStorage.setItem('specialProducts', JSON.stringify(initialSpecialProducts));
    }
  }, []);

  return (
    //showing special sales of the week
    <div style={{ textAlign: 'center' }}>
      <h2>Special Sales Of The Week </h2>
      <div className="specials-container">
        {specialProducts.map(product => (
          <div key={product.id} className="product-card" style={{ display: 'inline-block', margin: '30px'}}>
           {product.image === 'strawberries' && <img src={strawberries} alt={product.name} style={{width: '300px', height:'250px'}} />}
          {product.image === 'tomatoes' && <img src={tomatoes} alt={product.name} style={{width: '300px', height:'250px'}}/>}
          {product.image === 'coconutoil' && <img src={coconutoil} alt={product.name} style={{width: '300px', height:'250px'}}/>}
            <h3>{product.name}</h3>
            <p>Discounted Price: AU${product.discountedprice} </p>
            <p>Actual Price: AU${product.actualprice}</p>
          </div>
        ))}
        <hr />
      </div>
    </div>
  );
}

export default Products;