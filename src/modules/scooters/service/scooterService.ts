import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://sidekick-backend-279t.onrender.com/api",
  timeout: 10000,
});

export const scooterService = {
  getScooterDetails: async (imei: string) => {
    try {
      const response = await axiosClient.post(`/scooter/lastseen`, {
        imei: `864662073217384`,
      });

      if (response.data.success) {
        return response.data.data;
      //   return {
      //     success: true,
      //     data: response.data.data,
      //   };
      // } else {
      //   return {
      //     success: false,
      //     data: null,
      //   };
      }
    } catch (error) {
      console.error("Error fetching scooter details:", error);
      return {
        success: false,
        data: null,
      };
    }
  },

  toggleScooter: async (imei: string, immobilize: boolean) => {
    try {
      const response = await axiosClient.post(`/scooter/toggle`, {
        imei: imei,
        immobilize: immobilize,
      });

      if (response.data.message === "OK") {
        return response
      //   return {
      //     success: true,
      //   };
      // } else {
      //   return {
      //     success: false,
      //   };
      }
    } catch (error) {
      return {
        success: false,
      };
    }
  },
};
