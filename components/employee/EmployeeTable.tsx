import { Space, Table } from "antd";

import type { TableProps } from "antd";
import { EmployeeTableData } from "@/types/components";

const columns: TableProps<EmployeeTableData>["columns"] = [
	{
		title: "员工姓名",
		dataIndex: "name",
		key: "name",
		render: text => <a>{text}</a>,
	},
	{
		title: "账号",
		dataIndex: "username",
		key: "username",
	},
	{
		title: "手机号",
		dataIndex: "phone",
		key: "phone",
	},
	{
		title: "账号状态",
		dataIndex: "status",
		key: "status",
	},
	{
		title: "最后操作时间",
		dataIndex: "update_time",
		key: "update_time",
	},

	{
		title: "操作",
		key: "action",
		render: () => (
			<Space size="medium">
				<a>修改</a>
				<a>禁用</a>
			</Space>
		),
	},
];

const EmployeeTable = () => {
	const data: EmployeeTableData[] = Array.from({ length: 50 }, (_, index) => ({
		key: index,
		name: `员工 ${index}`,
		username: `员工 ${index}`,
		phone: `${index}`,
		status: index,
		update_time: `${index}`,
	}));

	return <Table columns={columns} dataSource={data} pagination={{ pageSizeOptions: [10] }} />;
};

export default EmployeeTable;
