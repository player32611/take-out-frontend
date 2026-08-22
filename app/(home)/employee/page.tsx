"use client";

import { useCallback, useEffect, useState } from "react";
import { Button, Flex, Input, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { employeePage } from "@/services";
import type { EmployeeTableData } from "@/types/components";

import EmployeeAddModel from "@/components/employee/EmployeeAddModel";
import EmployeeSetModel from "@/components/employee/EmployeeSetModel";
import EmployeeTable from "@/components/employee/EmployeeTable";
import style from "./employee.module.scss";

const { Search } = Input;

const Employee = () => {
	const [total, setTotal] = useState<number>(0);
	const [tableData, setTableData] = useState<EmployeeTableData[]>([]);
	const [currentSetId, setCurrentSetId] = useState<number | null>(null);
	const [addModelOpen, setAddModelOpen] = useState<boolean>(false);
	const [setModelOpen, setSetModelOpen] = useState<boolean>(false);
	const [inputText, setInputText] = useState<string>("");

	const handleRefresh = useCallback(
		(page: number = 1) => {
			employeePage({ name: inputText.length ? inputText : undefined, page, pageSize: 10 }).then(
				res => {
					setTotal(res.data.total);
					setTableData(
						res.data.records.map(record => ({
							key: record.id,
							name: record.name,
							username: record.username,
							phone: record.phone,
							status: record.status,
							updateTime: record.updateTime,
						})),
					);
				},
			);
		},
		[inputText],
	);

	const handleSet = useCallback((id: number) => {
		setCurrentSetId(id);
		setSetModelOpen(true);
	}, []);

	useEffect(() => {
		handleRefresh();
	}, [handleRefresh]);

	return (
		<div className={style.employee}>
			<Flex className={style.employee_bar} align="center" justify="space-between">
				<Space align="center">
					员工姓名：
					<Search
						placeholder="请输入员工姓名"
						value={inputText}
						onSearch={() => handleRefresh()}
						onChange={e => setInputText(e.target.value)}
						enterButton
					/>
				</Space>
				<Button type="primary" icon={<PlusOutlined />} onClick={() => setAddModelOpen(true)}>
					添加员工
				</Button>
			</Flex>
			<EmployeeTable
				data={tableData}
				total={total}
				handleRefresh={handleRefresh}
				handleSet={handleSet}
			></EmployeeTable>
			<EmployeeAddModel
				open={addModelOpen}
				handleClose={() => setAddModelOpen(false)}
				handleSuccess={handleRefresh}
			></EmployeeAddModel>
			<EmployeeSetModel
				open={setModelOpen}
				id={currentSetId}
				handleClose={() => setSetModelOpen(false)}
				handleSuccess={handleRefresh}
			/>
		</div>
	);
};

export default Employee;
