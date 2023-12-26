import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [blogpost, setBlogpost] = useState([]);

  useEffect(() => {
    main();
  }, [blogpost]);

  async function main() {
    const response = await axios.get("http://localhost:4001/products");
    // เปิด Console เพื่อดูผลลัพธ์
    setBlogpost(response.data.data);
    console.log(response);
  }
  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      {blogpost.map((post, index) => {
        return (
          <div className="product-list">
            <div className="product">
              <div className="product-preview">
                <img
                  src={post.image}
                  alt="some product"
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                <h1>Product name:{post.name}</h1>
                <h2>Product price:{post.price}Bath</h2>
                <p>Product description:{post.description}</p>
              </div>

              <button
                className="delete-button"
                onClick={async () => {
                  await axios.delete("http://localhost:4001/products/" + index);
                }}
              >
                x
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
