import { CategoryType, Employee, Status } from "./common";

export interface Response<T = unknown> {
	code: number;
	data: T;
	msg: string;
}

export interface PageResult<T = unknown> {
	total: number;
	records: T[];
}

export interface CategoryAddParams {
	id?: number;
	name: string;
	sort: number;
	type: CategoryType;
}

export interface CategoryUpdateParams {
	id: number;
	name: string;
	sort: number;
	type: CategoryType;
}

export interface CategoryPageParams {
	name?: string;
	page: number;
	pageSize: number;
	type?: CategoryType;
}

export interface CategoryStatusParams {
	status: Status;
	id: number;
}

export interface CategoryDeleteParams {
	id: number;
}

export interface CategoryListParams {
	type?: CategoryType;
}

export interface CommonUploadParams {
	file: File;
}

export interface DishAddParams {
	id?: number;
	name: string;
	categoryId: number;
	price: number;
	image: string;
	description?: string;
	status?: Status;
	flavors?: { name: string; value: string }[];
}

export interface DishPageVO {
	id: number;
	name: string;
	categoryId: number;
	price: number;
	image: string;
	description: string;
	status: Status;
	updateTime: string;
	categoryName: string;
}

export interface DishPageParams {
	categoryId?: number;
	name?: string;
	page: number;
	pageSize: number;
	status?: Status;
}

export interface DishDeleteParams {
	ids: string;
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

export interface EmployeeIdParams {
	id: number;
}

export interface EmployeeUpdateParams {
	id: number;
	idNumber: string;
	name: string;
	phone: string;
	sex: string;
	username: string;
}
