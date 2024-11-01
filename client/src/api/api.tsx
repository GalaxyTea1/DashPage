import axios from "./axiosConfig";

export const authAPI = {
  login: (credentials: any) => axios.post("/auth/login", credentials),
  register: (userData: any) => axios.post("/auth/register", userData),
  logout: () => axios.post("/auth/logout"),
};

export const userAPI = {
  getCurrentUser: () => axios.get("/users/me"),
  updateProfile: (data: any) => axios.put("/users/profile", data),
  deleteAccount: () => axios.delete("/users/me"),
};

