import { Space, Table } from "antd";
import type { TableProps } from "antd";
import type { EmployeeTableData } from "@/types/components";

import Status from "../common/Status/Status";

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
		render: status => <Status status={status}></Status>,
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
		status: 0,
		update_time: `${index}`,
	}));

	return <Table columns={columns} dataSource={data} pagination={{ pageSizeOptions: [10] }} />;
};

export default EmployeeTable;
