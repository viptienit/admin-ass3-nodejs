import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Menu from "../Menu/Menu";
import classes from "./Chat.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const socket = io(process.env.REACT_APP_MY_SECRET_KEY, {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd",
  },
});

function Chat(props) {
  const [allRoom, setAllRoom] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [message, setMessage] = useState({});
  const [text, setText] = useState("");
  const role = useSelector((state) => state.Session.role);
  const navigate = useNavigate();
  //chưa đăng nhập thì đưa về trang login
  useEffect(() => {
    if (!role) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    // nếu có room id thì thông báo cho server để vào phòng
    if (roomId) {
      socket.emit("vao-phong", roomId);
    } else {
      // chưa có room thì lấy danh sách phòng
      socket.emit("danh-sach-phong", "");
    }
  }, [roomId]);
  // lắng nghe sự kiện vào phòng thì lấy tất cả tin nahwns
  socket.on("vao-phong", (data) => {
    if (data.filter((mov) => mov.roomId === roomId)[0]) {
      setMessage(data.filter((mov) => mov.roomId === roomId)[0].messages);
    }
  });
  // lắng nghe server gửi danh sách phòng
  socket.on("danh-sach-phong", (data) => {
    setAllRoom(data);
  });

  const handlerSend = () => {
    // gửi tin nhắn lên server để gửi về cho người dùng
    socket.emit("send-admin", {
      room: roomId,
      messages: [...message, { is_admin: true, message: text }],
    });
    setText("");
  };
  // khi client tạo phòng admin cần lấy danh sách phòng ngay
  socket.on("c-tao-phong", (data) => {
    setAllRoom(data);
  });
  // khi client rời phòng admin cần lấy danh sách phòng ngay

  socket.on("c-end-phong", (data) => {
    setAllRoom(data);
    setRoomId("");
    setText("");
  });
  // lấy tin nhắn tương ứng khi admin đang ở trong phòng
  socket.on(roomId, (data) => setMessage(data));
  return (
    <div className={classes.flex}>
      <Menu />
      <div style={{ width: "75vw", position: "relative" }}>
        <div style={{ marginLeft: "40px" }}>
          <h2>Chat</h2>
        </div>
        <div
          style={{ width: "75vw", marginBottom: "40px" }}
          className={classes.flex}
        >
          <div
            style={{
              width: "20%",
              marginLeft: "40px",
              borderRight: "1px solid rgba(0, 0, 0, 0.301)",
              padding: "20px 20px 40px 0",
              textAlign: "center",
            }}
          >
            <input
              style={{
                width: "90%",
                marginBottom: "40px",
              }}
              placeholder="Search Contact"
            />
            {allRoom &&
              allRoom.map((mov, stt) => (
                <button
                  key={stt}
                  className={classes.btn}
                  onClick={() => setRoomId(mov.roomId)}
                  style={{
                    backgroundColor: roomId === mov.roomId ? "#3399ff" : "",
                  }}
                >
                  <Icon icon="typcn:user" color="#6cf" height={30} />
                  {mov.roomId}
                </button>
              ))}
          </div>
          <div
            style={{
              width: "70%",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              height: "70vh",
              overflow: "auto",
            }}
          >
            {roomId && (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  height: "70vh",
                  overflow: "auto",
                }}
              >
                {message.length &&
                  message.map((mov, stt) => {
                    return (
                      <div
                        key={stt}
                        className={mov.is_admin ? classes.textA : classes.textC}
                      >
                        <Icon
                          icon="typcn:user"
                          color={mov.is_admin ? "#47a3ff" : "#858585"}
                          height={30}
                        />
                        <p style={{ margin: "0" }}>{mov.message}</p>
                      </div>
                    );
                  })}
              </div>
            )}
            {roomId && (
              <div className={classes.send}>
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className={classes.input}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handlerSend();
                    }
                  }}
                />
                <Icon
                  icon="typcn:location-arrow"
                  height={50}
                  className={classes.icon}
                  onClick={handlerSend}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="footer text-center"></footer>
    </div>
  );
}

export default Chat;
