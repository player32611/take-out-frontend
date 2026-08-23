import { post } from "./axios";
import type { DishAddParams } from "@/types/services";

export const dishAdd = (params: DishAddParams) => {
	return post<void>("/admin/dish", params);
};
