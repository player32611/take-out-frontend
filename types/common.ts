export interface Employee {
	id: number;
	username: string;
	name: string;
	password: string;
	phone: string;
	sex: string;
	idNumber: string;
	status: Status;
	createTime: string | null;
	updateTime: string;
	createUser: number | null;
	updateUser: number;
}

export type Status = 0 | 1;
