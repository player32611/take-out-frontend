export interface Response<T = unknown> {
	code: number;
	data: T;
	msg: string;
}

export interface EmployeeAddData {}

export interface EmployeeAddParams {
	id?: number;
	id_number: string;
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
