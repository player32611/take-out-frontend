import { UploadFile } from "antd";
import type { CategoryType, Gender, OrderStatus, Status } from "./common";

export interface StatusParams {
	status: Status;
	disableText?: string;
	enableText?: string;
}

export interface CategoryAddModalParams {
	open: boolean;
	type: CategoryType;
	handleClose: () => void;
	handleSuccess: () => void;
}

export interface CategorySetModalParams {
	open: boolean;
	record: CategoryTableData | null;
	handleClose: () => void;
	handleSuccess: () => void;
}

export interface CategoryModalData {
	name: string;
	sort: number;
}

export interface CategoryTableParams {
	data: CategoryTableData[];
	total: number;
	handleRefresh: (page?: number) => void;
	handleSet: (record: CategoryTableData) => void;
}

export interface CategoryTableData {
	key: number;
	name: string;
	type: CategoryType;
	sort: number;
	status: Status;
	updateTime: string;
}

export interface DishAddModalParams {
	open: boolean;
	handleClose: () => void;
	handleSuccess: () => void;
}

export interface DishSetModalParams {
	open: boolean;
	id: number | null;
	handleClose: () => void;
	handleSuccess: () => void;
}

export interface DishModalData {
	name: string;
	categoryId: number;
	price: number;
	dishFlavor: {
		name: string;
		value: string;
	}[];
	image: UploadFile[];
	description: string;
}

export interface DishTableParams {
	data: DishTableData[];
	total: number;
	handleRefresh: (page?: number) => void;
	handleSet: (id: number) => void;
	ref?: React.Ref<DishTableRef>;
}

export interface DishTableData {
	key: number;
	name: string;
	image: string;
	categoryName: string;
	price: number;
	status: Status;
	updateTime: string;
}

export interface DishTableRef {
	handleDelete: (id?: number) => void;
}

export interface EmployeeAddModalParams {
	open: boolean;
	handleClose: () => void;
	handleSuccess: () => void;
}

export interface EmployeeModalData {
	name: string;
	username: string;
	phone: { prefix: string; phone: string };
	sex: Gender;
	idNumber: string;
}

export interface EmployeeSetModalParams {
	open: boolean;
	id: number | null;
	handleClose: () => void;
	handleSuccess: () => void;
}

export interface EmployeeTableParams {
	data: EmployeeTableData[];
	total: number;
	handleRefresh: (page?: number) => void;
	handleSet: (id: number) => void;
}

export interface EmployeeTableData {
	key: number;
	name: string;
	username: string;
	phone: string;
	status: Status;
	updateTime: string;
}

export interface HomeHeaderParams {
	collapsed: boolean;
	status: Status | null;
	setCollapsed: (collapsed: boolean) => void;
	handleSetStart: () => void;
}

export interface HomeSetModalParams {
	open: boolean;
	status: Status | null;
	handleClose: () => void;
	handleSuccess: () => void;
}

export interface HomeSiderParams {
	collapsed: boolean;
}

export interface LoginFormData {
	username: string;
	password: string;
	remember: boolean;
}

export interface LoginFormParams {
	handleChangeState: () => void;
}

export interface OrderDetailsModalParams {
	open: boolean;
	id: number | null;
	handleRefresh: () => void;
	handleClose: () => void;
	handleReason: (id: number, type: "拒单" | "取消") => void;
	ref?: React.Ref<OrderDetailsModalRef>;
}

export interface OrderDetailsModalRef {
	renewData: () => void;
}

export interface OrderReasonModalParams {
	open: boolean;
	id: number | null;
	type: "拒单" | "取消";
	handleClose: () => void;
	handleSuccess: () => void;
}

export interface OrderTableParams {
	data: OrderTableData[];
	total: number;
	handleRefresh: (page?: number) => void;
	handleCheck: (id: number) => void;
	handleReason: (id: number, type: "拒单" | "取消") => void;
}

export interface OrderTableData {
	key: number;
	number: string;
	status: OrderStatus;
	userName: string;
	phone: string;
	address: string;
	orderTime: string;
	amount: number;
}

export interface OrderTabsParams {
	tab: OrderStatus | 0;
	confirmed: number;
	deliveryInProgress: number;
	toBeConfirmed: number;
	handleChange: (tab: OrderStatus) => void;
}

export interface RegisterFormParams {
	handleChangeState: () => void;
}

export type ReportTimeRange = "yesterday" | "7days" | "30days" | "week" | "month";

export interface ReportTabsParams {
	tab: ReportTimeRange;
	handleChange: (tab: ReportTimeRange) => void;
}

export interface ReportChartParams {
	begin: string;
	end: string;
}

export interface SetmealModalData {
	name: string;
	categoryId: number;
	price: number;
	setmealDishes: {
		dishId: number;
		name: string;
		price: number;
		copies: number;
	}[];
	image: UploadFile[];
	description: string;
}

export interface SetmealAddModalParams {
	open: boolean;
	handleClose: () => void;
	handleSuccess: () => void;
}

export interface SetmealSetModalParams {
	open: boolean;
	id: number | null;
	handleClose: () => void;
	handleSuccess: () => void;
}

export interface SetmealTableParams {
	data: SetmealTableData[];
	total: number;
	handleRefresh: (page?: number) => void;
	handleSet: (id: number) => void;
	ref?: React.Ref<SetmealTableRef>;
}

export interface SetmealTableData {
	key: number;
	name: string;
	image: string;
	categoryName: string;
	price: number;
	status: Status;
	updateTime: string;
}

export interface SetmealTableRef {
	handleDelete: (id?: number) => void;
}
