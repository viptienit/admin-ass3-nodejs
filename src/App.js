import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import Chat from "./Chat/Chat";
import History from "./History/History";
import Home from "./Home/Home";
import Products from "./Products/Products";
import Users from "./Users/Users";
import Login from "./Login/Login";
import NewProduct from "./New/NewProduct";
import Detail from "./Detail/Detail";
import EditProduct from "./EditProduct/EditProduct";
import EditUser from "./EditUser/EditUser";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/users" element={<Users />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<EditProduct />} />
          <Route path="/user/:id" element={<EditUser />} />

          <Route path="/history" element={<History />} />
          <Route path="/login" element={<Login />} />
          <Route path="/new" element={<NewProduct />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
