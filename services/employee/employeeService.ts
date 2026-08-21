import {
	EmployeeAddParams,
	EmployeeLoginData,
	EmployeeLoginParams,
	EmployeePageData,
	EmployeePageParams,
	EmployeeStatusParams,
} from "@/types/services";
import { get, post } from "../request/axios";

export const employeeAdd = (params: EmployeeAddParams) => {
	return post<void>("/admin/employee", params);
};

export const employeeLogin = (params: EmployeeLoginParams) => {
	return post<EmployeeLoginData>("/admin/employee/login", params);
};

export const employeePage = (params: EmployeePageParams) => {
	return get<EmployeePageData>("/admin/employee/page", { params });
};

export const employeeStatus = (params: EmployeeStatusParams) => {
	return post<void>(`/admin/employee/status/${params.status}`, null, { params: { id: params.id } });
};
