import { get, put } from "./axios";
import type { Status, ShopSetStatusParams } from "@/types";

export const shopSetStatus = (params: ShopSetStatusParams) => {
	return put<Status>(`/admin/shop/${params.status}`);
};

export const shopGetStatus = () => {
	return get<Status>("/admin/shop/status");
};
