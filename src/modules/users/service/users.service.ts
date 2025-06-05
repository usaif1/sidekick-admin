import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_AXIOS_ENDPOINT,
});

type CreateEmployeePayload = {
  full_name: string;
  email: string;
  phone_number: string;
};

const usersService = {
  checkIfUserExists: async (phone_number: string) => {
    try {
      const response = await axiosInstance.post(`/user-exists`, {
        phone_number: phone_number,
      });
      return response.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  createEmployee: async (payload: CreateEmployeePayload) => {
    try {
      const response = await axiosInstance.post(`/create-employee`, payload);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

export default usersService;
