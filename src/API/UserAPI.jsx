import axiosClient from "./axiosClient";

const UserAPI = {
  getAllData: async () => {
    const url = `/user`;
    return axiosClient.get(url);
  },

  postCheckAdmin: async (data) => {
    const url = `/user/checkadmin`;
    return axiosClient.post(url, data);
  },
  getDetailData: (id) => {
    const url = `/user/id/${id}`;
    return axiosClient.get(url);
  },
  checkLogout: async () => {
    const url = `user/logout`;
    return axiosClient.delete(url);
  },
  checkAdminLogin: () => {
    const url = "/user/checkloginadmin";
    return axiosClient.get(url);
  },
  updateUser: (body) => {
    const url = "/user/updateUser";
    return axiosClient.put(url, body);
  },
  deleteUser: (id) => {
    const url = `/user/deleteUser/${id}`;
    return axiosClient.delete(url);
  },
};

export default UserAPI;
