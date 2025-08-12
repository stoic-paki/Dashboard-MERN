import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import "../App.css";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Logged out");
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  const fetchProducts = async () => {
    try {
      const url = "https://dashboard-mern-api.vercel.app/products";
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      setProducts(result);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="h-[100vh] w-[100vw] border-1 flex justify-center items-center">
      <div className="wrapper h-80 w-80 border-1 flex flex-col justify-center items-center gap-3">
        <h1 className="text-[2rem]">{loggedInUser} is logged in</h1>
        <button onClick={handleLogout} className="btn-1">
          logout
        </button>
        <div>
          <div>
            {products.map((item, index) => (
              <ul key={index}>
                <li>
                  {item.productName} : {item.price}
                </li>
              </ul>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
