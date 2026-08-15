import { EmployeeLoginData, EmployeeLoginParams, Response } from "@/types/services";
import request from "../request/axios";

export const employeeLogin = (params: EmployeeLoginParams) => {
	return request.post<Response<EmployeeLoginData>>("/admin/employee/login", params);
};
