import { CATEGORY_TYPE, STATUS, GENDER } from "@/lib/constants";

export interface Category {
	id: number;
	type: CategoryType;
	name: string;
	sort: number;
	status: Status;
	createTime: string;
	updateTime: string;
	createUser: number;
	updateUser: number;
}

export interface Dish {
	id: number;
	name: string;
	categoryId: number;
	price: number;
	image: string;
	description: string;
	status: Status;
	createTime: string;
	updateTime: string;
	createUser: number;
	updateUser: number;
}

export interface DishFlavor {
	id: number;
	dishId: number;
	name: string;
	value: string;
}

export interface Employee {
	id: number;
	username: string;
	name: string;
	password: string;
	phone: string;
	sex: string;
	idNumber: string;
	status: Status;
	createTime: string;
	updateTime: string;
	createUser: number;
	updateUser: number;
}

export type Status = (typeof STATUS)[keyof typeof STATUS];

export type CategoryType = (typeof CATEGORY_TYPE)[keyof typeof CATEGORY_TYPE];

export type Gender = (typeof GENDER)[keyof typeof GENDER];
