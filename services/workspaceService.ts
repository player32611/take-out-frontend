import { get } from "./axios";
import type {
	WorkspaceBusinessData,
	WorkspaceDishesData,
	WorkspaceOrdersData,
	WorkspaceSetmealsData,
} from "@/types";

export const workspaceBusiness = () => {
	return get<WorkspaceBusinessData>("/admin/workspace/businessData");
};

export const workspaceOrders = () => {
	return get<WorkspaceOrdersData>("/admin/workspace/overviewOrders");
};

export const workspaceDishes = () => {
	return get<WorkspaceDishesData>("/admin/workspace/overviewDishes");
};

export const workspaceSetmeals = () => {
	return get<WorkspaceSetmealsData>("/admin/workspace/overviewSetmeals");
};
