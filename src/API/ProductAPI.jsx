import axiosClient from "./axiosClient";

const ProductAPI = {
  getAPI: () => {
    const url = "/product";
    return axiosClient.get(url);
  },
  postAPI: (body, name, category, shortDesc, longDesc, price, sl) => {
    const url = `/product?name=${name}&category=${category}&shortDesc=${shortDesc}&longDesc=${longDesc}&price=${price}&sl=${sl}`;
    return axiosClient.post(url, body, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  update: (id, body) => {
    const url = `/product/${id}`;
    return axiosClient.put(url, body);
  },
  delete: (id) => {
    const url = `/product/${id}`;
    return axiosClient.delete(url);
  },
  //

  getDetail: (id) => {
    const url = `/product/${id}`;
    return axiosClient.get(url);
  },
};

export default ProductAPI;
