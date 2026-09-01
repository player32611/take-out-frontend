import type {
	Employee,
	EmployeeAddParams,
	EmployeeIdParams,
	EmployeeLoginData,
	EmployeeLoginParams,
	EmployeePageData,
	EmployeePageParams,
	EmployeeStatusParams,
	EmployeeUpdateParams,
} from "@/types";

import { get, post, put } from "./axios";

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

export const employeeId = (params: EmployeeIdParams) => {
	return get<Employee>(`/admin/employee/${params.id}`);
};

export const employeeUpdate = (params: EmployeeUpdateParams) => {
	return put<void>(`/admin/employee`, params);
};

export const employeeLogout = () => {
	return post<void>(`/admin/employee/logout`);
};
