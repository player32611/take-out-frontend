import { del, get, post } from "./axios";
import type {
	DishAddParams,
	DishDeleteParams,
	DishIdParams,
	DishPageParams,
	DishPageVO,
	DishVO,
	PageResult,
} from "@/types/services";

export const dishAdd = (params: DishAddParams) => {
	return post<void>("/admin/dish", params);
};

export const dishPage = (params: DishPageParams) => {
	return get<PageResult<DishPageVO>>("/admin/dish/page", { params });
};

export const dishDelete = (params: DishDeleteParams) => {
	return del<void>("/admin/dish", { params });
};

export const dishId = (params: DishIdParams) => {
	return get<DishVO>(`/admin/dish/${params.id}`);
};
