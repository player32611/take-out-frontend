import { Space, Table } from "antd";
import type { TableProps } from "antd";
import type { EmployeeTableData, EmployeeTableParams } from "@/types/components";

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
		dataIndex: "updateTime",
		key: "updateTime",
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

const EmployeeTable = ({ data, total, handleRefresh }: EmployeeTableParams) => {
	return (
		<Table
			columns={columns}
			dataSource={data}
			pagination={{
				total: total,
				pageSizeOptions: [10],
				showTotal: total => `共 ${total} 条`,
				showSizeChanger: true,
				showQuickJumper: true,
				locale: {
					items_per_page: "条/页",
					jump_to: "跳至",
					page: "页",
				},
			}}
			locale={{ emptyText: "暂无数据" }}
			onChange={pagination => {
				const current = pagination.current ?? 1;
				handleRefresh(current);
			}}
		/>
	);
};

export default EmployeeTable;
