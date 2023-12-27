import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [postBlog, setPostBlog] = useState([]);

  const getData = async () => {
    const result = await axios.get("http://localhost:4001/products");
    // console.log(result.data.data)

    setPostBlog(result.data.data);
  };
  const deleteData = async (index) => {
    await axios.delete(`http://localhost:4001/products/${index}`);
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {postBlog.map((item, index) => {
          return (
            <div key={item.id} className="product">
              <div className="product-preview">
                <img
                  src={item.image}
                  alt="some product"
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                <h1>Product name: {item.name}</h1>
                <h2>Product price: {item.price}</h2>
                <p>Product description:{item.description}</p>
              </div>

              <button
                className="delete-button"
                onClick={() => {
                  deleteData(item.id);
                }}
              >
                x
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
