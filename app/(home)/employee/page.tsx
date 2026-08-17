"use client";

import { Button, Flex, Input, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import EmployeeTable from "@/components/employee/EmployeeTable";
import style from "./employee.module.scss";

const { Search } = Input;

const Employee = () => {
	const handleSearch = () => {};

	return (
		<div className={style.employee}>
			<Flex className={style.employee_bar} align="center" justify="space-between">
				<Space align="center">
					员工姓名：
					<Search placeholder="请输入员工姓名" onSearch={handleSearch} enterButton />
				</Space>
				<Button type="primary" icon={<PlusOutlined />}>
					添加员工
				</Button>
			</Flex>
			<EmployeeTable></EmployeeTable>
		</div>
	);
};

export default Employee;
