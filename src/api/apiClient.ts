import axios, { CancelToken } from "axios";
import { logoutHandler } from "redux/reducers/authReducer";
import { store } from "redux/rootConfig";

export const BASE_URL = "http://10.0.1.75:8000";

export const HttpConfig = {
  BASE_URL,
  API_PATH: BASE_URL,
};
export default class HttpClient {
  async doRequest(cancelToken?: CancelToken) {
    const instance = axios.create({
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": "ru",
      },
      cancelToken,
    });

    instance.interceptors.response.use(
      response => response,
      error => {
        if (error?.response?.status === 401) {
          store.dispatch(logoutHandler());
        }
        return error;
      },
    );
    return instance;
  }

  async doGet(url = "", params = {}, cancelToken?: CancelToken) {
    return (await this.doRequest(cancelToken)).get(makeUrl(url), {
      params,
    });
  }
  async doGetBlob(url = "", params = {}) {
    return (await this.doRequest()).get(makeUrl(url), {
      params,
      responseType: "blob",
    });
  }
  async doGetBase(url = "") {
    return (await this.doRequest()).get(url);
  }

  async doDeleteBase(url = "") {
    return (await this.doRequest()).delete(url);
  }

  async doPost(url = "", data = {}) {
    return (await this.doRequest()).post(makeUrl(url), data);
  }

  async doPut(url = "", data = {}) {
    return (await this.doRequest()).put(makeUrl(url), data);
  }

  async doDelete(url = "", data = {}) {
    return (await this.doRequest()).delete(makeUrl(url), data);
  }
}

function makeUrl(url = "") {
  return url.includes("http") ? url : `${HttpConfig.API_PATH}${url}`;
}

export function makeBaseUrl(url = "") {
  return url.includes("http") ? url : `${HttpConfig.BASE_URL}${url}`;
}
