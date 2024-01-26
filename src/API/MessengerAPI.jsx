import axiosClient from "./axiosClient";

const MessengerAPI = {
  getMessage: (query) => {
    const url = query ? `/session?room=${query}` : `/session`;
    return axiosClient.get(url);
  },
};

export default MessengerAPI;
