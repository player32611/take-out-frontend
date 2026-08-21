import { Employee, Status } from "./common";

export interface Response<T = unknown> {
	code: number;
	data: T;
	msg: string;
}

export interface PageResult<T = unknown> {
	total: number;
	records: T[];
}

export interface EmployeeAddParams {
	id?: number;
	idNumber: string;
	name: string;
	phone: string;
	sex: string;
	username: string;
}

export interface EmployeeLoginData {
	id: number;
	name: string;
	username: string;
	token: string;
}

export interface EmployeeLoginParams {
	username: string;
	password: string;
}

export type EmployeePageData = PageResult<Employee>;

export interface EmployeePageParams {
	name?: string;
	page: number;
	pageSize: number;
}

export interface EmployeeStatusParams {
	status: Status;
	id: number;
}
