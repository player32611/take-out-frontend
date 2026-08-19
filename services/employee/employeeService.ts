import {
	EmployeeAddData,
	EmployeeAddParams,
	EmployeeLoginData,
	EmployeeLoginParams,
} from "@/types/services";
import { post } from "../request/axios";

export const employeeAdd = (params: EmployeeAddParams) => {
	return post<EmployeeAddData>("/admin/employee", params);
};

export const employeeLogin = (params: EmployeeLoginParams) => {
	return post<EmployeeLoginData>("/admin/employee/login", params);
};
