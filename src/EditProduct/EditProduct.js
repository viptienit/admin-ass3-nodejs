import { useEffect, useState } from "react";
import ProductAPI from "../API/ProductAPI";
import Menu from "../Menu/Menu";
import classes from "../New/NewProduct.module.css";
import { useParams, useNavigate } from "react-router-dom";
const EditProduct = () => {
  const param = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [sl, setSl] = useState("");

  const [img, setImg] = useState({});

  const [shortDescription, setShortDesc] = useState("");
  const [longDescription, setlongDesc] = useState("");

  useEffect(() => {
    const API = async () => {
      const response = await ProductAPI.getDetail(param.id);
      setCategory(response[0].category);
      setName(response[0].name);
      setImg({
        img1: response[0].img1,
        img2: response[0].img2,
        img3: response[0].img3,
        img4: response[0].img4,
      });
      setShortDesc(response[0].short_desc);
      setlongDesc(response[0].long_desc);
      setPrice(response[0].price);
      setSl(response[0].sl);
    };
    API();
  }, []);

  const SubmitHandler = async (e) => {
    e.preventDefault();
    if (!name) {
      alert("Please fill in your product name!");
      return;
    }
    if (!category) {
      alert("Please fill out the category your product!");
      return;
    }
    if (!shortDescription) {
      alert("Please fill in Short Description!");
      return;
    }
    if (!longDescription) {
      alert("Please fill in Long Description!");
      return;
    }
    if (!price) {
      alert("Please fill in Long Description!");
      return;
    }
    if (!sl) {
      alert("Please fill in Quantity!");
      return;
    }

    const response = await ProductAPI.update(param.id, {
      category: category,
      name: name,
      price: price,
      longDesc: longDescription,
      shortDesc: shortDescription,
      sl: sl,
    });
    if (response.err) {
      alert(response.message);
    } else {
      alert(response);
      if (response) navigate("/products");
    }
  };

  return (
    <div className={classes.flex}>
      <Menu />
      <div style={{ width: "80vw", paddingBottom: "50px" }}>
        <h2 style={{ marginLeft: "40px" }}>New Product</h2>
        <div>
          <form
            style={{
              width: "70%",
              marginLeft: "40px",
              color: "rgba(0, 0, 0, 0.637)",
            }}
          >
            <div>
              <label>Product Name</label>
              <br />
              <input
                type="text"
                placeholder="Enter Product Name"
                style={{ width: "50%", height: "30px", margin: "15px 0" }}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label>Product Quantity</label>
              <br />
              <input
                type="text"
                placeholder="Enter Product Name"
                style={{ width: "50%", height: "30px", margin: "15px 0" }}
                value={sl}
                onChange={(e) => setSl(e.target.value)}
              />
            </div>
            <div>
              <label>Price</label>
              <br />
              <input
                type="text"
                placeholder="Enter Price"
                style={{ width: "50%", height: "30px", margin: "15px 0" }}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <br />
              <input
                type="text"
                placeholder="Enter Category"
                style={{
                  width: "50%",
                  height: "30px",
                  height: "30px",
                  margin: "15px 0",
                }}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div>
              <label>Short Description</label>
              <br />
              <textarea
                rows="3"
                placeholder="Enter Short Description"
                style={{ width: "50%", margin: "15px 0" }}
                value={shortDescription}
                onChange={(e) => setShortDesc(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label>Long Description</label>
              <br />
              <textarea
                rows="6"
                placeholder="Enter Long Description"
                style={{ width: "50%", margin: "15px 0" }}
                value={longDescription}
                onChange={(e) => setlongDesc(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label>Image (không được thay đổi)</label>
              <br />
              <p>Url-1: {img.img1}</p>
              <p>Url-2: {img.img2}</p>
              <p>Url-3: {img.img3}</p>
              <p>Url-4: {img.img4}</p>
            </div>
            <button
              onClick={SubmitHandler}
              className={classes.btn}
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
