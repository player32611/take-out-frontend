import { SetmealAddParams } from "@/types";
import { post } from "./axios";

export const setmealAdd = (params: SetmealAddParams) => {
	return post<void>("/admin/setmeal", params);
};
