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
