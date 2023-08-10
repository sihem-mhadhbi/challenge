import { useState } from "react";

import "./App.css";

function App() {
  const [credit, setCredit] = useState(200);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const products = [
    {
      id: 1,
      name: "Example Product 1",
      price: 50,
      giftOption: true,
      giftPrice: 20,
    },
    {
      id: 2,
      name: "Example Product 2",
      price: 30,
      giftOption: false,
      giftPrice: 0,
    },
    {
      id: 3,
      name: "Example Product 3",
      price: 80,
      giftOption: true,
      giftPrice: 40,
    },
    {
      id: 4,
      name: "Example Product 4",
      price: 120,
      giftOption: false,
      giftPrice: 0,
    },
  ];

  const addToCart = (product) => {
    if (product.giftOption && credit >= product.giftPrice) {
      setCredit(credit - product.giftPrice);
      setSelectedProducts([
        ...selectedProducts,
        { ...product, price: product.giftPrice },
      ]);
    } else if (!product.giftOption && credit >= product.price) {
      setCredit(credit - product.price);
      setSelectedProducts([
        ...selectedProducts,
        { ...product, price: product.price },
      ]);
    } else if (!product.giftOption && credit < product.price) {
      setCredit(0);
      setSelectedProducts([...selectedProducts, { ...product, price: credit }]);
      setSelectedProducts([
        ...selectedProducts,
        { ...product, price: product.price - credit, quantity: 1 },
      ]);
    }
  };

  return (
    <div className="App">
      <h2>User-Friendly Product Panel</h2>
      <p>Available Credit: {credit}Dt</p>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product">
            <p>
              {product.name} - {product.price}Dt
            </p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <h3>Selected Products:</h3>
      <div className="selected-products">
        {selectedProducts.map((product, index) => (
          <p key={index}>
            {product.name} - {product.price}Dt
          </p>
        ))}
      </div>
      <p>Remaining Credit: {credit}Dt</p>
    </div>
  );
}

export default App;
