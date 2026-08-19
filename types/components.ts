import { Status } from "./common";

export interface CategoryTableData {
	key: number;
	name: string;
	type: number;
	sort: number;
	status: Status;
	update_time: string;
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
	id_number: string;
}

export interface EmployeeTableData {
	key: number;
	name: string;
	username: string;
	phone: string;
	status: Status;
	update_time: string;
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
