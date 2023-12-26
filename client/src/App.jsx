import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getPost();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`	
    http://localhost:4001/products/${id}`);

    getPost();
  };

  const getPost = async () => {
    try {
      const result = await axios.get("http://localhost:4001/products");

      setData(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {data.map((item) => {
          return (
            <div className="product" key={item.id}>
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
                <h2>Product price: {item.price} Baht</h2>
                <p>Product description:{item.description}</p>
              </div>

              <button
                className="delete-button"
                onClick={() => {
                  handleDelete(item.id);
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
