// import io from "socket.io-client";
// const socket = io("http://localhost:5000", { transports: ["websocket"] });

import React, { useEffect, useState } from "react";
import HistoryAPI from "../API/HistoryAPI";
import Menu from "../Menu/Menu";
import classes from "./History.module.css";
import convertMoney from "../convertMoney";
import { useNavigate } from "react-router-dom";

function History() {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAPI = async () => {
      const dataHistory = await HistoryAPI.getHistoryAPI();

      setHistory(dataHistory);
    };
    fetchAPI();
  }, []);

  return (
    <div className={classes.flex}>
      <Menu />
      <div style={{ marginLeft: "30px", width: "83vw", paddingBottom: "50px" }}>
        <div>
          <h2 style={{ color: "#3399ff" }}>History</h2>
          <div
            style={{ border: "1px solid  rgba(0, 0, 0, 0.301)", width: "73vw" }}
            className={classes.flex}
          >
            <p
              style={{
                width: "20%",
                marginLeft: "10px",
                borderRight: "1px solid  rgba(0, 0, 0, 0.301)",
              }}
            >
              ID User
            </p>
            <p
              style={{
                width: "10%",
                marginLeft: "10px",
                borderRight: "1px solid  rgba(0, 0, 0, 0.301)",
              }}
            >
              Name
            </p>
            <p
              style={{
                width: "12%",
                marginLeft: "10px",
                borderRight: "1px solid  rgba(0, 0, 0, 0.301)",
              }}
            >
              Phone
            </p>
            <p
              style={{
                width: "12%",
                marginLeft: "10px",
                borderRight: "1px solid  rgba(0, 0, 0, 0.301)",
              }}
            >
              Address
            </p>
            <p
              style={{
                width: "10%",
                marginLeft: "10px",
                borderRight: "1px solid  rgba(0, 0, 0, 0.301)",
              }}
            >
              Total
            </p>
            <p
              style={{
                width: "13%",
                marginLeft: "10px",
                borderRight: "1px solid  rgba(0, 0, 0, 0.301)",
              }}
            >
              Delivery
            </p>
            <p
              style={{
                width: "13%",
                marginLeft: "10px",
                borderRight: "1px solid  rgba(0, 0, 0, 0.301)",
              }}
            >
              Status
            </p>
            <p style={{ width: "12%", marginLeft: "10px" }}>Detail</p>
          </div>
          {history.length &&
            history.map((mov, stt) => (
              <div
                key={mov._id}
                style={{
                  border: "1px solid  rgba(0, 0, 0, 0.301)",
                  width: "73vw",
                  borderTop: "none",
                  backgroundColor: stt % 2 ? "#f2f2f2" : "#ffe6ff",
                }}
                className={classes.flex}
              >
                <p
                  style={{
                    width: "20%",
                    marginLeft: "10px",
                    borderRight: "1px solid  rgba(0, 0, 0, 0.301)",
                  }}
                >
                  {mov.userId}
                </p>
                <p
                  style={{
                    width: "10%",
                    marginLeft: "10px",
                    borderRight: "1px solid  rgba(0, 0, 0, 0.301)",
                  }}
                >
                  {mov.fullname}
                </p>
                <p
                  style={{
                    width: "12%",
                    marginLeft: "10px",
                    borderRight: "1px solid  rgba(0, 0, 0, 0.301)",
                  }}
                >
                  {mov.phone}
                </p>
                <p
                  style={{
                    width: "12%",
                    marginLeft: "10px",
                    borderRight: "1px solid  rgba(0, 0, 0, 0.301)",
                  }}
                >
                  {mov.address}
                </p>
                <p
                  style={{
                    width: "10%",
                    marginLeft: "10px",
                    borderRight: "1px solid  rgba(0, 0, 0, 0.301)",
                  }}
                >
                  {convertMoney(mov.total)}
                </p>
                <p
                  style={{
                    width: "13%",
                    marginLeft: "10px",
                    borderRight: "1px solid  rgba(0, 0, 0, 0.301)",
                  }}
                >
                  {mov.delivery ? "đã vận chuyển" : "chưa vận chuyển"}
                </p>
                <p
                  style={{
                    width: "13%",
                    marginLeft: "10px",
                    borderRight: "1px solid  rgba(0, 0, 0, 0.301)",
                  }}
                >
                  {mov.status}
                </p>
                <p style={{ width: "12%", marginLeft: "10px" }}>
                  <button
                    onClick={() => navigate(`/detail/${mov._id}`)}
                    className={classes.btn}
                  >
                    View
                  </button>
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default History;
