import { Space, Table } from "antd";

import type { TableProps } from "antd";
import type { CategoryTableData } from "@/types/components";

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
				<a>删除</a>
				<a>禁用</a>
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
		status: index,
		update_time: `${index}`,
	}));

	return <Table columns={columns} dataSource={data} pagination={{ pageSizeOptions: [10] }} />;
};

export default CategoryTable;
