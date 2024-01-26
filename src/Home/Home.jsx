import React, { useEffect, useState } from "react";
import HistoryAPI from "../API/HistoryAPI";
import Menu from "../Menu/Menu";
import classes from "./Home.module.css";
import { Icon } from "@iconify/react";
import UserAPI from "../API/UserAPI";
import convertMoney from "../convertMoney";
import { useNavigate } from "react-router-dom";

function Home() {
  const [history, setHistory] = useState([]);
  const [users, setUser] = useState([]);
  const [moneyTB, setMoneyTB] = useState(0);
  const navigate = useNavigate();
  // Hàm này dùng để tìm ra những user khác với admin

  useEffect(() => {
    const fetchAPI = async () => {
      const dataHistory = await HistoryAPI.getHistoryAPI();
      const money = dataHistory.length
        ? dataHistory.reduce((cur, mov) => cur + mov.total, 0) /
          ((new Date(
            dataHistory.sort((a, b) => new Date(a.time) - new Date(b.time))[
              dataHistory.length - 1
            ].time
          ).getFullYear() -
            new Date(
              dataHistory.sort(
                (a, b) => new Date(a.time) - new Date(b.time)
              )[0].time
            ).getFullYear()) *
            12 +
            new Date(
              dataHistory.sort((a, b) => new Date(a.time) - new Date(b.time))[
                dataHistory.length - 1
              ].time
            ).getMonth() -
            new Date(
              dataHistory.sort(
                (a, b) => new Date(a.time) - new Date(b.time)
              )[0].time
            ).getMonth() +
            1)
        : "";
      setMoneyTB(money);
      setHistory(
        dataHistory
          .sort((a, b) => new Date(b.time) - new Date(a.time))
          .slice(0, 8)
      );
      const dataUser = await UserAPI.getAllData();
      setUser(dataUser.filter((mov) => mov.role === "client"));
    };
    fetchAPI();
  }, []);

  return (
    <div className={classes.flex}>
      <Menu />
      <div style={{ marginLeft: "30px", width: "83vw", paddingBottom: "50px" }}>
        <p className={classes.text}>Dashboard</p>
        <div className={classes.flex}>
          <div className={classes.items}>
            <div className={classes.item}>
              <h2>{users.length}</h2>
              <p className={classes.text}>Clients</p>
            </div>
            <p className={classes.text}>
              <Icon icon="typcn:user-add-outline" height={40} />
            </p>
          </div>
          <div className={classes.items}>
            <div className={classes.item}>
              <h2>{convertMoney(moneyTB)} VND</h2>
              <p className={classes.text}>Earnings of Month</p>
            </div>
            <p className={classes.text}>
              <Icon icon="nimbus:money" height={40} />
            </p>
          </div>
          <div className={classes.items}>
            <div className={classes.item}>
              <h2>{history.length}</h2>
              <p className={classes.text}>New Orders</p>
            </div>
            <p className={classes.text}>
              <Icon icon="typcn:clipboard" height={40} />
            </p>
          </div>
        </div>
        <div>
          <h4>History</h4>
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

export default Home;
