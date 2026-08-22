import { CategoryType, Status } from "./common";

export interface CategoryAddModelParams {
	open: boolean;
	type: CategoryType;
	handleClose: () => void;
	handleSuccess: () => void;
}

export interface CategoryAddModelData {
	name: string;
	sort: number;
}

export interface CategorySetModelParams {
	open: boolean;
	record: CategoryTableData | null;
	handleClose: () => void;
	handleSuccess: () => void;
}

export interface CategorySetModelData {
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
export interface DishAddModelParams {
	open: boolean;
	handleClose: () => void;
	handleSuccess: () => void;
}

export interface DishAddModelData {
	name: string;
	categoryId: number;
	price: number;
	image: string;
	description: string;
}

export interface DishTableParams {
	data: DishTableData[];
	total: number;
	handleRefresh: (page?: number) => void;
	handleSet: (record: DishTableData) => void;
}

export interface DishTableData {
	key: number;
	name: string;
	image: string;
	categoryId: number;
	price: number;
	status: Status;
	updateTime: string;
}

export interface EmployeeAddModelParams {
	open: boolean;
	handleClose: () => void;
	handleSuccess: () => void;
}

export interface EmployeeAddModelData {
	name: string;
	username: string;
	phone: { prefix: string; phone: string };
	sex: "男" | "女";
	idNumber: string;
}

export interface EmployeeSetModelParams {
	open: boolean;
	id: number | null;
	handleClose: () => void;
	handleSuccess: () => void;
}

export interface EmployeeSetModelData {
	name: string;
	username: string;
	phone: { prefix: string; phone: string };
	sex: "男" | "女";
	idNumber: string;
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

export interface LoginFormData {
	username: string;
	password: string;
	remember: boolean;
}

export interface LoginFormParams {
	handleChangeState: () => void;
}

export interface RegisterFormParams {
	handleChangeState: () => void;
}
