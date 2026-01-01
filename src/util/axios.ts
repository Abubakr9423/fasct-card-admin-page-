import axios from "axios";

export const SaveToken = (token:any) => {
  localStorage.setItem("authToken", token);
};
export const GetToken = () => {
  return localStorage.getItem("authToken");
};

export const axiosRequest = axios.create({
  baseURL: "https://store-api.softclub.tj",
});
axiosRequest.interceptors.request.use(
  (config:any) => {
    const token = GetToken();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error:any) => Promise.reject(error)
);
