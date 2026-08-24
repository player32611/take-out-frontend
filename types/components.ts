import { UploadFile } from "antd";
import type { CategoryType, Gender, Status } from "./common";

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

export interface RegisterFormParams {
	handleChangeState: () => void;
}
