import { useCallback } from "react";
import { Space, Table } from "antd";
import type { TableProps } from "antd";
import type { DishTableData, DishTableParams } from "@/types/components";

import Status from "../common/Status/Status";

const rowSelection: TableProps<DishTableData>["rowSelection"] = {
	onChange: (selectedRowKeys: React.Key[], selectedRows: DishTableData[]) => {
		console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
	},
	getCheckboxProps: (record: DishTableData) => ({
		disabled: record.name === "Disabled User",
		name: record.name,
	}),
};

const DishTable = ({ total, handleRefresh, handleSet }: DishTableParams) => {
	const handleChangeStatus = useCallback(() => {}, []);

	const handleDelete = useCallback(() => {}, []);

	const columns: TableProps<DishTableData>["columns"] = [
		{
			title: "菜品名称",
			dataIndex: "name",
			key: "name",
			render: text => <a>{text}</a>,
		},
		{
			title: "图片",
			dataIndex: "image",
			key: "image",
		},
		{
			title: "菜品分类",
			dataIndex: "categoryId",
			key: "categoryId",
		},
		{
			title: "售价",
			dataIndex: "price",
			key: "price",
		},
		{
			title: "售卖状态",
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
			render: (_, record) => (
				<Space size="medium">
					<a onClick={() => handleSet(record)}>修改</a>
					<a style={{ color: "red" }} onClick={() => handleDelete(record.key)}>
						删除
					</a>
					<a
						style={{ color: record.status ? "red" : "" }}
						onClick={() => handleChangeStatus(record.key, record.status ? 0 : 1)}
					>
						{record.status ? "禁用" : "启用"}
					</a>
				</Space>
			),
		},
	];

	const data: DishTableData[] = Array.from({ length: 20 }, (_, i) => ({
		key: i,
		name: `${i}`,
		image: `${i}`,
		categoryId: i,
		price: i,
		status: 0,
		updateTime: `${i}`,
	}));

	return (
		<Table
			rowSelection={{ type: "checkbox", ...rowSelection }}
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

export default DishTable;
