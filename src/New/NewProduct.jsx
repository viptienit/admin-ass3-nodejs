import { useState, useEffect } from "react";
import ProductAPI from "../API/ProductAPI";
import Menu from "../Menu/Menu";
import classes from "./NewProduct.module.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const name = useRef();
  const navigate = useNavigate();
  const category = useRef();
  const price = useRef();
  const sl = useRef();

  const shortDescription = useRef();
  const longDescription = useRef();
  const [file, setFile] = useState([]);

  const SubmitHandler = async (e) => {
    e.preventDefault();
    if (!name.current.value) {
      alert("Please fill in your product name!");
      return;
    }
    if (!category.current.value) {
      alert("Please fill out the category your product!");
      return;
    }
    if (!shortDescription.current.value) {
      alert("Please fill in Short Description!");
      return;
    }
    if (!longDescription.current.value) {
      alert("Please fill in Long Description!");
      return;
    }
    if (!price.current.value) {
      alert("Please fill in Long Description!");
      return;
    }
    if (!sl.current.value) {
      alert("Please fill in Long Description!");
      return;
    }
    if (file.length !== 4) {
      alert("Please fill in Images!");
      return;
    }
    const formData = new FormData();
    const files = file;
    for (let i = 0; i < files.length; i++) {
      formData.append("image", files[i]);
    }

    const response = await ProductAPI.postAPI(
      formData,
      name.current.value,
      category.current.value,
      shortDescription.current.value,
      longDescription.current.value,
      price.current.value,
      sl.current.value
    );
    if (response.err) {
      alert(response.message);
    } else {
      alert(response);
      navigate("/products");
    }
  };
  const ChangeImg = (e) => {
    e.preventDefault();
    setFile(e.target.files);
  };

  return (
    <div className={classes.flex}>
      <Menu />
      <div style={{ width: "70vw", paddingBottom: "50px" }}>
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
                ref={name}
              />
            </div>
            <div>
              <label>Quantity Product</label>
              <br />
              <input
                type="number"
                placeholder="Enter Product Quantity"
                style={{ width: "50%", height: "30px", margin: "15px 0" }}
                ref={sl}
              />
            </div>
            <div>
              <label>Price</label>
              <br />
              <input
                type="number"
                placeholder="Enter Price"
                style={{ width: "50%", height: "30px", margin: "15px 0" }}
                ref={price}
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
                ref={category}
              />
            </div>
            <div>
              <label>Short Description</label>
              <br />
              <textarea
                rows="3"
                placeholder="Enter Short Description"
                style={{ width: "50%", margin: "15px 0" }}
                ref={shortDescription}
              ></textarea>
            </div>
            <div>
              <label>Long Description</label>
              <br />
              <textarea
                rows="6"
                placeholder="Enter Long Description"
                style={{ width: "50%", margin: "15px 0" }}
                ref={longDescription}
              ></textarea>
            </div>
            <div>
              <label>Upload image (4 images)</label>
              <br />
              <input
                type="file"
                name="image"
                id="exampleFormControlFile1"
                onChange={ChangeImg}
                multiple
              />
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

export default NewProduct;
