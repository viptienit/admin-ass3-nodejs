import axiosClient from "./axiosClient";

const HistoryAPI = {
  getHistoryAPI: () => {
    const url = `/order/all`;
    return axiosClient.get(url);
  },
  getHistoryId: (id) => {
    const url = `/order?order=${id}`;
    return axiosClient.get(url);
  },
};

export default HistoryAPI;
