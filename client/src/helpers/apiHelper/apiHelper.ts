import axios from "axios";
import { getAuthToken, showMessage } from "../common/commonHelper";

interface Params {
  baseUrl: any;
  headers: any;
  method: string;
  withCredentials: boolean;
}

interface ServiceTS {
  url: string;
  data?: any;
  method?: string;
}
export class APIService {
  private authToken: string;
  private config: Params;
  constructor() {
    this.authToken = getAuthToken();
    this.config = {
      baseUrl: import.meta.env.VITE_REACT_APP_API_BASE_URL,
      headers: {
        Authorization: `Bearer ${this.authToken}`,
      },
      method: "post",
      withCredentials: true,
    };
  }

  updateAuthToken = (token: string) => {
    this.authToken = token;
    this.config = {
      ...this.config,
      headers: {
        Authorization: `Bearer ${this.authToken}`,
      },
    };
  };
  callApi = async ({ url, data, method }: ServiceTS): Promise<any> => {
    console.log(`${this.config.baseUrl}/${url}`, method);
    return await axios({
      ...this.config,
      method: method ?? "get",
      url: `${this.config.baseUrl}/${url}`,
      data,
    })
      .then((response) => {
        debugger;
        console.log(response);
        return {
          status: response?.status,
          data: response?.data,
        };
      })
      .catch((error) => {
        if (error.response.status == 401) {
          showMessage(
            false,
            "You are logged out from system. Please login again"
          );
          //logout();
          location.href = "/";
        } else {
          showMessage(
            false,
            "Unexpected error occured. Please try again later"
          );
        }
        return {
          status: error?.response?.status,
          data: error?.response?.data,
        };
      });
  };
}
