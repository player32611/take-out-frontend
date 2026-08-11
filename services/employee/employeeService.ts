import { EmployeeLoginData, EmployeeLoginParams, Response } from "@/types/services";
import { request } from "../request";

export const employeeLogin = (params: EmployeeLoginParams) => {
	return request<Response<EmployeeLoginData>>("/admin/employee/login", {
		method: "POST",
		body: JSON.stringify(params),
	});
};
