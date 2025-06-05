import { auth } from "@/firebase";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";

let currentToken: string | null = null;

export const getToken = () => {
  return new Promise<string>((resolve, reject) => {
    if (currentToken) {
      resolve(currentToken);
    } else {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        unsubscribe();
        if (user) {
          try {
            const userToken = await user.getIdToken(true);
            currentToken = userToken;
            resolve(userToken);
          } catch (error) {
            reject(error);
          }
        } else {
          reject(new Error("User not found."));
        }
      });
    }
  });
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_AXIOS_ENDPOINT,
});

// Attach token before every request
axiosInstance.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const homeService = {
  getManagerProfile: async () => {
    try {
      const response = await axiosInstance.post(`/get-user-details`, {});
      return response.data?.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

export default homeService;
