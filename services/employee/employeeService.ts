import {
	EmployeeAddData,
	EmployeeAddParams,
	EmployeeLoginData,
	EmployeeLoginParams,
	EmployeePageData,
	EmployeePageParams,
} from "@/types/services";
import { get, post } from "../request/axios";

export const employeeAdd = (params: EmployeeAddParams) => {
	return post<EmployeeAddData>("/admin/employee", params);
};

export const employeeLogin = (params: EmployeeLoginParams) => {
	return post<EmployeeLoginData>("/admin/employee/login", params);
};

export const employeePage = (params: EmployeePageParams) => {
	return get<EmployeePageData>("/admin/employee/page", { params });
};
