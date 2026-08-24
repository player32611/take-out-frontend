import type {
	Category,
	CategoryAddParams,
	CategoryDeleteParams,
	CategoryListParams,
	CategoryPageParams,
	CategoryStatusParams,
	CategoryUpdateParams,
	PageResult,
} from "@/types";
import { del, get, post, put } from "./axios";

export const categoryPage = (params: CategoryPageParams) => {
	return get<PageResult<Category>>("/admin/category/page", { params });
};

export const categoryAdd = (params: CategoryAddParams) => {
	return post<void>("/admin/category", params);
};

export const categoryUpdate = (params: CategoryUpdateParams) => {
	return put<void>("/admin/category", params);
};

export const categoryStatus = (params: CategoryStatusParams) => {
	return post<void>(`/admin/category/status/${params.status}`, null, { params: { id: params.id } });
};

export const categoryDelete = (params: CategoryDeleteParams) => {
	return del<void>("/admin/category", { params });
};

export const categoryList = (params: CategoryListParams) => {
	return get<Category[]>("/admin/category/list", { params });
};
