import { Space, Table } from "antd";
import type { TableProps } from "antd";
import type { CategoryTableData } from "@/types/components";

import Status from "../common/Status/Status";

const columns: TableProps<CategoryTableData>["columns"] = [
	{
		title: "分类名称",
		dataIndex: "name",
		key: "name",
		render: text => <a>{text}</a>,
	},
	{
		title: "分类类型",
		dataIndex: "type",
		key: "type",
	},
	{
		title: "排序",
		dataIndex: "sort",
		key: "sort",
	},
	{
		title: "状态",
		dataIndex: "status",
		key: "status",
		render: status => <Status status={status}></Status>,
	},
	{
		title: "操作时间",
		dataIndex: "update_time",
		key: "update_time",
	},

	{
		title: "操作",
		key: "action",
		render: () => (
			<Space size="medium">
				<a>修改</a>
				<a style={{ color: "red" }}>删除</a>
				<a style={{ color: "red" }}>禁用</a>
			</Space>
		),
	},
];

const CategoryTable = () => {
	const data: CategoryTableData[] = Array.from({ length: 50 }, (_, index) => ({
		key: index,
		name: `${index}`,
		type: index,
		sort: index,
		status: 1,
		updateTime: `${index}`,
	}));

	return <Table columns={columns} dataSource={data} pagination={{ pageSizeOptions: [10] }} />;
};

export default CategoryTable;
