import { NavLink } from "react-router-dom";
import classes from "./menu.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { addSession, deleteSession } from "../Redux/Action/ActionSession";
import UserAPI from "../API/UserAPI";

function Menu(props) {
  const navigate = useNavigate();
  const role = useSelector((state) => state.Session.role);
  const dispatch = useDispatch();

  useEffect(() => {
    const AdminAPI = async () => {
      const response = await UserAPI.checkAdminLogin();
      console.log(response);
      if (response.role === "admin") {
        dispatch(addSession({ id: response.id, role: response.role }));
      } else if (response.role === "adviser") {
        alert("bạn chỉ có thể chat với client ");
        navigate("/chat");
        dispatch(addSession({ id: response.id, role: response.role }));
      } else {
        navigate("/login");
        alert("bạn cần đăng nhập");
      }
    };
    AdminAPI();
  }, []);

  const LogoutHandler = async () => {
    await UserAPI.checkLogout();
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    dispatch(deleteSession(""));
    navigate("/login");
  };
  return (
    <div className={classes.menu}>
      <h1 className={classes.header}>ADMIN PAGE</h1>
      {role === "adviser" && (
        <div className={classes.flex}>
          <h2 style={{ paddingLeft: "30px", color: "rgb(146, 146, 146)" }}>
            MENU
          </h2>
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.now : classes.link
            }
            to="/chat"
          >
            <span>Chat</span>
          </NavLink>
          <NavLink onClick={LogoutHandler} className={classes.link}>
            <span>{role ? "Logout" : "Login"}</span>
          </NavLink>
        </div>
      )}
      {role === "admin" && (
        <div className={classes.flex}>
          <h2 style={{ paddingLeft: "30px", color: "rgb(146, 146, 146)" }}>
            MENU
          </h2>
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.now : classes.link
            }
            to="/"
          >
            <span>Dashboard</span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.now : classes.link
            }
            to="/chat"
          >
            <span>Chat</span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.now : classes.link
            }
            to="/users"
          >
            <span>Users</span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.now : classes.link
            }
            to="/products"
          >
            <span>Products</span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.now : classes.link
            }
            to="/history"
          >
            <span>History</span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.now : classes.link
            }
            to="/new"
          >
            <span>New Product</span>
          </NavLink>
          <NavLink onClick={LogoutHandler} className={classes.link}>
            <span>{role ? "Logout" : "Login"}</span>
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default Menu;
