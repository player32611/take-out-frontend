import {
	EmployeeAddParams,
	EmployeeIdParams,
	EmployeeLoginData,
	EmployeeLoginParams,
	EmployeePageData,
	EmployeePageParams,
	EmployeeStatusParams,
	EmployeeUpdateParams,
} from "@/types/services";
import { Employee } from "@/types/common";

import { get, post, put } from "../request/axios";

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
