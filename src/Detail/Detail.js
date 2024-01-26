import React, { useEffect, useState } from "react";
import HistoryAPI from "../API/HistoryAPI";
import Menu from "../Menu/Menu";
import classes from "./Detail.module.css";
import { useParams } from "react-router-dom";
import convertMoney from "../convertMoney";

function Detail() {
  const [order, setOrder] = useState({});

  const param = useParams();
  useEffect(() => {
    const FetchApi = async () => {
      const response = await HistoryAPI.getHistoryId(param.id);
      setOrder(response);
    };
    FetchApi();
  }, []);

  return (
    <div className={classes.flex}>
      <Menu />

      <div style={{ width: "90%", marginLeft: "60px" }}>
        <h1 style={{ color: "red" }}>INFORMATION ORDER</h1>
        <h4>Order ID: {order._id}</h4>

        <h4>Name: {order.fullname}</h4>
        <h4>Email: {order.email}</h4>

        <h5>Phone: {order.phone}</h5>
        <h5>Address: {order.address}</h5>
        <div style={{ display: "flex", textAlign: "center" }}>
          <span style={{ width: "400px" }}>Tên Sản Phẩm</span>
          <span style={{ width: "50px" }}>Hình Ảnh</span>
          <span style={{ width: "170px" }}>Giá</span>
          <span style={{ width: "100px" }}>Số Lượng</span>
          <span style={{ width: "170px" }}>Thành Tiền</span>
        </div>
        {order.cart &&
          order.cart.map((mov, stt) => (
            <div key={stt} style={{ display: "flex", textAlign: "center" }}>
              <span style={{ width: "400px" }}>{mov.nameProduct}</span>
              <img src={mov.img} style={{ width: "50px" }} />
              <span style={{ width: "170px" }}>{mov.priceProduct} VND</span>
              <span style={{ width: "100px" }}>{mov.count}</span>
              <span style={{ width: "170px" }}>{mov.total} VND</span>
            </div>
          ))}

        <h1>Tổng Thanh Toán :</h1>
        <h1>{convertMoney(order.total)} VND</h1>
      </div>
    </div>
  );
}

export default Detail;
