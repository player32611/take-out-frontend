import { get, post, put } from "./axios";
import type {
	PageResult,
	SetmealAddParams,
	SetmealIdParams,
	SetmealPageParams,
	SetmealPageVO,
	SetmealStatusParams,
	SetmealUpdateParams,
	SetmealVO,
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

export const setmealId = (params: SetmealIdParams) => {
	return get<SetmealVO>(`/admin/setmeal/${params.id}`);
};

export const setmealUpdate = (params: SetmealUpdateParams) => {
	return put<void>("/admin/setmeal", params);
};
