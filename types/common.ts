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

export type Status = 0 | 1;

export type CategoryType = 1 | 2;
