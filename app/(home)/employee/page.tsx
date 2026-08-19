"use client";

import { useState } from "react";
import { Button, Flex, Input, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import EmployeeAddModel from "@/components/employee/EmployeeAddModel/EmployeeAddModel";
import EmployeeTable from "@/components/employee/EmployeeTable";
import style from "./employee.module.scss";

const { Search } = Input;

const Employee = () => {
	const [modelOpen, setModelOpen] = useState(false);

	const handleSearch = () => {};

	const modalSuccess = () => {
		console.log("confirm");
	};

	return (
		<div className={style.employee}>
			<Flex className={style.employee_bar} align="center" justify="space-between">
				<Space align="center">
					员工姓名：
					<Search placeholder="请输入员工姓名" onSearch={handleSearch} enterButton />
				</Space>
				<Button type="primary" icon={<PlusOutlined />} onClick={() => setModelOpen(true)}>
					添加员工
				</Button>
			</Flex>
			<EmployeeTable></EmployeeTable>
			<EmployeeAddModel
				open={modelOpen}
				handleClose={() => setModelOpen(false)}
				handleSuccess={modalSuccess}
			></EmployeeAddModel>
		</div>
	);
};

export default Employee;
