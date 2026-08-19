import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import { getToken } from "@/lib/auth";
import { message } from "antd";
import { Response } from "@/types/services";

const request = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

request.interceptors.request.use(
	config => {
		const token = getToken();

		if (token) {
			config.headers.token = token;
		}

		return config;
	},
	error => {
		return Promise.reject(error);
	},
);

request.interceptors.response.use(
	response => {
		const res = response.data;

		if (res.code === 200) {
			return res;
		}

		message.error(res.msg);
		return Promise.reject(res);
	},
	error => {
		if (axios.isAxiosError(error)) {
			if (!error.response) {
				message.error("网络错误，请检查网络或服务器是否启动");
				return Promise.reject(error);
			}

			const status = error.response.status;

			switch (status) {
				case 400:
					message.error("请求参数错误");
					break;

				case 401:
					message.error("登录已过期，请重新登录");
					// router.push("/login")
					break;

				case 403:
					message.error("没有权限访问");
					break;

				case 404:
					message.error("请求的资源不存在");
					break;

				case 500:
					message.error("服务器内部错误");
					break;

				default:
					message.error(`请求失败：${status}`);
			}
		}

		return Promise.reject(error);
	},
);

export const get = <T>(url: string, config?: AxiosRequestConfig): Promise<Response<T>> => {
	return request.get(url, config);
};

export const post = <T>(
	url: string,
	data?: unknown,
	config?: AxiosRequestConfig,
): Promise<Response<T>> => {
	return request.post(url, data, config);
};
