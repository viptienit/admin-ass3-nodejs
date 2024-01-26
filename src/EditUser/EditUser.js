import { useEffect, useState } from "react";
import Menu from "../Menu/Menu";
import classes from "./EditUser.module.css";
import { useParams, useNavigate } from "react-router-dom";
import UserAPI from "../API/UserAPI";
const EditUser = () => {
  const param = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const API = async () => {
      const response = await UserAPI.getDetailData(param.id);
      setName(response[0].fullname);
      setEmail(response[0].email);
      setPassword(response[0].password);
      setPhone(response[0].phone);
      setRole(response[0].role);
    };
    API();
  }, []);

  const SubmitHandler = async (e) => {
    if (!name || !email || !password || !phone || !role) {
      alert("please,Fill in all information!");
    } else {
      const response = await UserAPI.updateUser({
        id: param.id,
        fullname: name,
        phone: phone,
        password: password,
        role: role,
        email: email,
      });
      if (response.err) {
        alert(response.message);
      } else {
        alert(response);
        navigate("/users");
      }
    }
  };

  return (
    <div className={classes.flex}>
      <Menu />
      <div style={{ paddingBottom: "50px" }} className={classes.user}>
        <h2>Update User</h2>
        <h3>Fullname</h3>
        <input
          className={classes.input}
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <h3>Email</h3>
        <input
          type="email"
          className={classes.input}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <h3>Phone</h3>
        <input
          type="number"
          className={classes.input}
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
        />
        <h3>Password (can not change)</h3>
        <input
          style={{ padding: "10px", fontSize: "18px", width: "500px" }}
          onChange={(e) => setPassword(password)}
          value={password}
        />
        <h3>Role</h3>
        <input
          className={classes.input}
          onChange={(e) => setRole(e.target.value)}
          value={role}
        />
        <button className={classes.btn} onClick={SubmitHandler}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default EditUser;
