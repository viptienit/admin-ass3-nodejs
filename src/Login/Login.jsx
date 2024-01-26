import React, { useState, useEffect } from "react";
import UserAPI from "../API/UserAPI";
import { useDispatch } from "react-redux";
import "./Login.css";
import { addSession } from "../Redux/Action/ActionSession";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const AdminAPI = async () => {
      const response = await UserAPI.checkAdminLogin();
      if (response.role === "admin") {
        navigate("/");
        dispatch(addSession({ id: response.id, role: response.role }));
      } else if (response.role === "adviser") {
        navigate("/chat");
        dispatch(addSession({ id: response.id, role: response.role }));
      } else alert("bạn cần đăng nhập");
    };
    AdminAPI();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const response = await UserAPI.getAllData();

      setUser(response);
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (!email) {
      return alert("Bạn chưa nhập Eamil");
    }
    if (!password) {
      return alert("Bạn chưa nhập mật khẩu");
    }

    const findUser = user.find((value) => {
      return value.email === email;
    });

    if (!findUser) {
      alert("sai Email!");
      return;
    } else {
      const response = await UserAPI.postCheckAdmin({
        id: findUser._id,
        password: password,
      });
      if (response.id) {
        console.log("thanh cong");
        dispatch(addSession({ id: response.id, role: response.role }));
        document.cookie = `jwt=${response.token}`;

        if (response.role === "admin") {
          navigate("/");
        } else {
          navigate("/chat");
        }
      } else {
        alert(response);
      }
    }
  };

  return (
    <div>
      <div>
        <div className="row">
          <div className="login">
            <div className="heading">
              <h2>Sign in</h2>
              <form action="#">
                <div className="input-group input-group-lg">
                  <span className="input-group-addon">
                    <i className="fa fa-user"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="input-group input-group-lg">
                  <span className="input-group-addon">
                    <i className="fa fa-lock"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button type="button" className="float" onClick={handleSubmit}>
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
