import { UploadFile } from "antd";
import { CategoryType, Gender, Status } from "./common";

export interface StatusParams {
	status: Status;
	disableText?: string;
	enableText?: string;
}

export interface CategoryAddModelParams {
	open: boolean;
	type: CategoryType;
	handleClose: () => void;
	handleSuccess: () => void;
}

export interface CategorySetModelParams {
	open: boolean;
	record: CategoryTableData | null;
	handleClose: () => void;
	handleSuccess: () => void;
}

export interface CategoryModelData {
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

export interface DishSetModelParams {
	open: boolean;
	id: number | null;
	handleClose: () => void;
	handleSuccess: () => void;
}

export interface DishModelData {
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

export interface EmployeeAddModelParams {
	open: boolean;
	handleClose: () => void;
	handleSuccess: () => void;
}

export interface EmployeeModelData {
	name: string;
	username: string;
	phone: { prefix: string; phone: string };
	sex: Gender;
	idNumber: string;
}

export interface EmployeeSetModelParams {
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
