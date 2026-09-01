import { get } from "./axios";
import type {
	ReportTurnoverData,
	ReportParams,
	ReportUserData,
	ReportOrdersData,
	ReportTop10Data,
} from "@/types";

export const reportTurnover = (params: ReportParams) => {
	return get<ReportTurnoverData>("/admin/report/turnoverStatistics", { params });
};

export const reportUser = (params: ReportParams) => {
	return get<ReportUserData>("/admin/report/userStatistics", { params });
};

export const reportOrders = (params: ReportParams) => {
	return get<ReportOrdersData>("/admin/report/ordersStatistics", { params });
};

export const reportTop10 = (params: ReportParams) => {
	return get<ReportTop10Data>("/admin/report/top10", { params });
};

export const reportExport = () => {
	return get<Blob>("/admin/report/export", {
		responseType: "blob",
	});
};
