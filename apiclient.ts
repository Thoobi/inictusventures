import axios from "axios";
import { ErrorVault, PathScrubber } from "./security/guards";

const errorHandler = new ErrorVault();
const pathGuard = new PathScrubber();

// Client talks to our server only, not external APIs
export const baseInstance = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 15000,
});

class ApiClient {
  async get<T>(endpoint: string): Promise<T> {
    const safePath = pathGuard.cleanupPath(endpoint);
    
    try {
      const resp = await baseInstance.get<T>(safePath);
      return resp.data;
    } catch (err) {
      throw errorHandler.hideInternalDetails(err);
    }
  }
}

export const apiClient = new ApiClient();
