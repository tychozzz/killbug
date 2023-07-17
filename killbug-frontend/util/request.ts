import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { message } from 'antd';
import Cookies from 'js-cookie';

interface ResponseData<T> {
  code: number;
  msg: string;
  data: T;
}

const BASE_URL = 'http://127.0.0.1:8888';

class HttpRequest {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: BASE_URL,
    });

    // 添加请求拦截器
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // 设置请求头的 Authorization 字段
        // 1.适用于客户端Cookie获取token
        const user = Cookies.get('user');
        if (user) {
          const token = JSON.parse(user).token
          config.headers['Authorization'] = `${token}`;
          config.params = {}
          // console.log(config)
          return config
        }
        // 2.适用于服务端渲染，直接在方法中传递Token，最后置空params
        if (config?.params?.headers?.Authorization && config?.params?.headers?.Authorization != '') {
          const token = config.params.headers.Authorization;
          config.headers['Authorization'] = `${token}`;
        }
        config.params = {}
        // console.log(config)
        return config;
      },
      (error: any) => {
        return Promise.reject(error);
      }
    );

    // 添加响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse<ResponseData<any>>) => {
        const res = response.data;
        if (res.code === 200) {
          return res.data;
        } else if(res.code === 401) {
          message.error(res.msg);
          const user = Cookies.get('user');
          if (user) {
            Cookies.remove('user');
          }
          return Promise.reject(res);
        } else {
          message.error(res.msg);
          return Promise.reject(res);
        }
      },
      (error: any) => {
        const { response } = error;
        if (response) {
          message.error(response.data.msg);
        } else {
          message.error('Error!');
        }
        return Promise.reject(error);
      }
    );
  }

  public get<T>(url: string, params?: object) {
    return this.instance.get<T>(url, { params });
  }

  public post<T>(url: string, data?: object) {
    return this.instance.post<T>(url, data);
  }

  public put<T>(url: string, data?: object) {
    return this.instance.put<T>(url, data);
  }

  public delete<T>(url: string, params?: object) {
    return this.instance.delete<T>(url, { params });
  }
}

const request = new HttpRequest();

export default request;
