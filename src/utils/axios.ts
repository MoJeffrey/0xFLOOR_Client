import axios, { AxiosRequestConfig } from 'axios'
import { ElNotification } from 'element-plus'
import { config } from './config'
import {User} from "./User";

/*
 * 创建Axios请求
 */
export const createAxios = (axiosConfig: AxiosRequestConfig,
                            successFunc: (data: JSON) => void,
                            errorFunc: (data: JSON) => void) => {
    const Axios = axios.create({
        baseURL: config.api_url,
        timeout: 1000 * 10,
        headers: {
            'Content-Type': 'application/json',
        },
        responseType: 'json',
    })

    // 请求拦截
    Axios.interceptors.request.use(
        (config) => {
            // 请求前处理
            const token = new User().getToken()
            if(token){
                config.headers['Authorization'] = `Token ${token}`;
            }

            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )

    // 响应拦截
    Axios.interceptors.response.use(
        (response) => {
            // 响应成功处理
            successFunc(response.data)
            return response.data
        },
        (error) => {
            if(! error.response.data.detail && error.response.status === 404){
                ElNotification({
                    title: '错误',
                    message: '找不到该API',
                    type: 'error'
                })
                return;
            }

            if(! error.response.data.detail && error.response.status === 500){
                ElNotification({
                    title: '错误',
                    message: 'API错误',
                    type: 'error'
                })
                return;
            }

            if(error.response.data.detail && error.response.status === 401){
                ElNotification({
                    message: '登录凭证失效，请重新登入',
                    type: 'error'
                })
                new User().clear()
                window.location.reload()
                return;
            }

            if(error.response.status === 400){
                errorFunc(error.response.data)
            }

            return
        }
    )
    return Axios(axiosConfig)
}
