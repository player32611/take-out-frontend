import axios from "axios";
import { getToken } from "@/utils/auth";

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
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	error => {
		return Promise.reject(error);
	},
);

export default request;
