import { get, put } from "./axios";
import type {
	OrderCompleteParams,
	OrderConfirmParams,
	OrderDeliveryParams,
	OrderRejectionParams,
	OrderSearchParams,
	OrderSearchVO,
	OrderStatisticsData,
	OrderDetailsParams,
	PageResult,
	OrderDetailsData,
	OrderCancelParams,
} from "@/types";

export const orderSearch = (params: OrderSearchParams) => {
	return get<PageResult<OrderSearchVO>>("/admin/order/conditionSearch", { params });
};

export const orderDelivery = (params: OrderDeliveryParams) => {
	return put<void>(`/admin/order/delivery/${params.id}`);
};

export const orderConfirm = (params: OrderConfirmParams) => {
	return put<void>("/admin/order/confirm", params);
};

export const orderRejection = (params: OrderRejectionParams) => {
	return put<void>("/admin/order/rejection", params);
};

export const orderComplete = (params: OrderCompleteParams) => {
	return put<void>(`/admin/order/complete/${params.id}`);
};

export const orderStatistics = () => {
	return get<OrderStatisticsData>("/admin/order/statistics");
};

export const orderDetails = (params: OrderDetailsParams) => {
	return get<OrderDetailsData>(`/admin/order/details/${params.id}`);
};

export const orderCancel = (params: OrderCancelParams) => {
	return put<void>("/admin/order/cancel", params);
};
