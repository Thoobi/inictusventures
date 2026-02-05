import axios from "axios";
import { WORKSPACE_TOKEN, BASE_URL } from "./constant";

export const baseInstance = axios.create({
  baseURL: BASE_URL || "",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",

    Authorization: `Bearer ${WORKSPACE_TOKEN}`,
  },
});

class ApiClient {
  async get<T>(endpoint: string): Promise<T> {
    try {
      const baseURL = baseInstance.defaults.baseURL;

      if (!baseURL) {
        throw new Error(
          "BASE_URL is not configured. Set NEXT_PUBLIC_BASE_URL environment variable.",
        );
      }

      const url = endpoint;

      const response = await baseInstance.get<T>(url);
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }
}

export const apiClient = new ApiClient();
