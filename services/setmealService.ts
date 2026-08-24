import { get, post } from "./axios";
import type {
	PageResult,
	SetmealAddParams,
	SetmealPageParams,
	SetmealPageVO,
	SetmealStatusParams,
} from "@/types";

export const setmealAdd = (params: SetmealAddParams) => {
	return post<void>("/admin/setmeal", params);
};

export const setmealPage = (params: SetmealPageParams) => {
	return get<PageResult<SetmealPageVO>>("/admin/setmeal/page", { params });
};

export const setmealStatus = (params: SetmealStatusParams) => {
	return post<void>(`/admin/setmeal/status/${params.status}`, null, { params: { id: params.id } });
};
