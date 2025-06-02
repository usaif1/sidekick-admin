import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_AJJAS_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": import.meta.env.VITE_AJJAS_API_KEY,
  },
  timeout: 10000,
});

export const scooterService = {
  getScooterDetails: async (imei: string) => {
    try {
      const response = await axiosClient.get(`/lastseen`, {
        params: {
          imei,
        },
      });

      if (response.data.message === "OK") {
        return {
          success: true,
          data: response.data.data,
        };
      } else {
        return {
          success: false,
          data: null,
        };
      }
    } catch (error) {
      console.error("Error fetching scooter details:", error);
      return {
        success: false,
        data: null,
      };
    }
  },
};
