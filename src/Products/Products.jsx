import React, { useEffect, useState } from "react";
import ProductAPI from "../API/ProductAPI";
import Menu from "../Menu/Menu";
import classes from "./Product.module.css";
import convertMoney from "../convertMoney";
import { useNavigate } from "react-router-dom";
function Products(props) {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await ProductAPI.getAPI();
      setProducts(response);
    };
    fetchProduct();
  }, []);
  const DeleteHandler = async (id) => {
    if (window.confirm("Are You Sure?")) {
      const response = await ProductAPI.delete(id);

      if (response.err) {
        alert(response.message);
      } else {
        const response = await ProductAPI.getAPI();

        alert("Đã xóa thành công");
        setProducts(response);
      }
    }
  };
  return (
    <div className={classes.flex}>
      <Menu />
      <div style={{ marginLeft: "30px", width: "83vw", paddingBottom: "50px" }}>
        <div>
          <h4>Products</h4>
          <input
            placeholder="Enter Search Name"
            style={{ padding: "10px 20px", marginBottom: "40px" }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div
            style={{ border: "1px solid  rgba(0, 0, 0, 0.301)", width: "70vw" }}
            className={classes.flex}
          >
            <p
              style={{
                width: "19%",
                marginLeft: "10px",
                borderRight: "1px solid  rgba(0, 0, 0, 0.301)",
              }}
            >
              ID
            </p>
            <p
              style={{
                width: "31%",
                marginLeft: "10px",
                borderRight: "1px solid  rgba(0, 0, 0, 0.301)",
              }}
            >
              Name
            </p>
            <p
              style={{
                width: "10%",
                marginLeft: "10px",
                borderRight: "1px solid  rgba(0, 0, 0, 0.301)",
              }}
            >
              Price
            </p>
            <p
              style={{
                width: "10%",
                marginLeft: "10px",
                borderRight: "1px solid  rgba(0, 0, 0, 0.301)",
              }}
            >
              Quantity
            </p>
            <p
              style={{
                width: "8%",
                marginLeft: "10px",
                borderRight: "1px solid  rgba(0, 0, 0, 0.301)",
              }}
            >
              Image
            </p>
            <p
              style={{
                width: "10%",
                marginLeft: "10px",
                borderRight: "1px solid  rgba(0, 0, 0, 0.301)",
              }}
            >
              Category
            </p>
            <p
              style={{
                width: "15%",
                marginLeft: "10px",
              }}
            >
              Edit
            </p>
          </div>
          {products.length &&
            products
              .filter((mov) =>
                mov.name.toUpperCase().includes(name.toUpperCase())
              )
              .map((mov, stt) => (
                <div
                  key={mov._id}
                  style={{
                    border: "1px solid  rgba(0, 0, 0, 0.301)",
                    width: "70vw",
                    borderTop: "none",
                    backgroundColor: stt % 2 ? "#f2f2f2" : "#ffe6ff",
                  }}
                  className={classes.flex}
                >
                  <p
                    style={{
                      width: "19%",
                      marginLeft: "10px",
                      borderRight: "1px solid  rgba(0, 0, 0, 0.301)",
                    }}
                  >
                    {mov._id}
                  </p>
                  <p
                    style={{
                      width: "31%",
                      marginLeft: "10px",
                      borderRight: "1px solid  rgba(0, 0, 0, 0.301)",
                    }}
                  >
                    {mov.name}
                  </p>
                  <p
                    style={{
                      width: "10%",
                      marginLeft: "10px",
                      borderRight: "1px solid  rgba(0, 0, 0, 0.301)",
                    }}
                  >
                    {convertMoney(mov.price)}
                  </p>
                  <p
                    style={{
                      width: "10%",
                      marginLeft: "10px",
                      borderRight: "1px solid  rgba(0, 0, 0, 0.301)",
                    }}
                  >
                    {mov.sl}
                  </p>
                  <div
                    style={{
                      width: "8%",
                      marginRight: "10px",
                    }}
                    src={mov.img1}
                  >
                    <img
                      style={{
                        width: "50px",
                        height: "50px",
                        marginLeft: "10px",
                      }}
                      src={mov.img1}
                    />
                  </div>

                  <p
                    style={{
                      width: "10%",
                      paddingLeft: "10px",

                      borderRight: "1px solid  rgba(0, 0, 0, 0.301)",
                      borderLeft: "1px solid  rgba(0, 0, 0, 0.301)",
                    }}
                  >
                    {mov.category}
                  </p>
                  <div
                    style={{
                      width: "15%",
                      marginLeft: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <button
                      onClick={() => navigate(`/products/${mov._id}`)}
                      className={classes.btnU}
                    >
                      Update
                    </button>
                    <button
                      onClick={() => DeleteHandler(mov._id)}
                      className={classes.btnD}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
