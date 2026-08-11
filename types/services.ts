export interface Response<T> {
	code: number;
	data: T;
	msg: string;
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
