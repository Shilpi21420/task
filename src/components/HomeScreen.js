import React, { useState, useEffect } from "react";
import ListViewSwitch from "./ListViewSwitch"; 

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState("list");
  useEffect(() => {
    async function fetchProducts() {
      try {
        console.log("Fetching");
        const response = await fetch(
          "https://mocki.io/v1/0934df88-6bf7-41fd-9e59-4fb7b8758093"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Received data:", data);


        if (Array.isArray(data.data)) {
          setProducts(data.data);
        } else {
          console.error("Invalid data");
        }
      } catch (error) {
        console.error("Error");
      }
    }

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.product_title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>Products</h1>
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ListViewSwitch view={view} setView={setView} />{" "}
      <ul className={view === "grid" ? "grid-view" : "list-view"}>
        {Array.isArray(filteredProducts) &&
          filteredProducts.map((product, index) => (
            <li key={index}>
              <div className="product-container">
                <span className="badge">{product.product_badge}</span>
                <img src={product.product_image} alt={product.product_title} />
              </div>
              <div className="product-info">
                <h3>{product.product_title}</h3>
                <ul className="product-variants">
                  {product.product_variants.map((variant, variantIndex) => (
                    <li key={variantIndex}>{Object.values(variant)[0]}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default HomeScreen;
