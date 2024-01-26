import React, { useEffect, useState } from "react";
import UserAPI from "../API/UserAPI";
import Menu from "../Menu/Menu";
import classes from "./Users.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function Users(props) {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");

  const role = useSelector((state) => state.Session.role);
  const navigate = useNavigate();
  // Hàm này dùng để tìm ra những user khác với admin

  useEffect(() => {
    if (!role) {
      navigate("/login");
    } else if (role === "adsiver") {
      navigate("/chat");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await UserAPI.getAllData();
      console.log(response);

      setUsers(response);
    };

    fetchData();
  }, []);

  const DeleteUser = async (id) => {
    if (window.confirm("Are You Sure?")) {
      const response = await UserAPI.deleteUser(id);
      if (response.err) {
        alert(response.message);
      } else {
        alert(response);
        const userAPI = await UserAPI.getAllData();
        console.log(userAPI);

        setUsers(userAPI);
      }
    }
  };
  return (
    <div className={classes.flex}>
      <Menu />

      <div style={{ marginLeft: "40px", paddingBottom: "50px" }}>
        <h2>Users</h2>
        <input
          value={name}
          style={{ height: "30px", marginBottom: "30px" }}
          type="text"
          placeholder="Enter Search!"
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <div>
          <table>
            <thead>
              <tr>
                <th style={{ width: "300px" }}>ID</th>
                <th style={{ width: "100px" }}>Fullname</th>
                <th style={{ width: "200px" }}>Email</th>
                <th style={{ width: "200px" }}>Phone</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: "center" }}>
              {users &&
                users
                  .filter((mov) =>
                    mov.fullname.toUpperCase().includes(name.toUpperCase())
                  )
                  .map((value, stt) => (
                    <tr
                      style={{
                        backgroundColor: stt % 2 ? "#f2f2f2" : "#ffe6ff",
                      }}
                      key={value._id}
                    >
                      <td style={{ width: "300px" }}>{value._id}</td>
                      <td style={{ width: "100px" }}>{value.fullname}</td>
                      <td style={{ width: "200px" }}>{value.email}</td>
                      <td style={{ width: "200px" }}>{value.phone}</td>
                      <td>
                        <button
                          onClick={() => navigate(`/user/${value._id}`)}
                          className={classes.btnU}
                        >
                          Update
                        </button>
                        &nbsp;
                        <button
                          onClick={() => DeleteUser(value._id)}
                          className={classes.btnD}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;
