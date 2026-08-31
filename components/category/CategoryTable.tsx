import { useCallback } from "react";
import { message, Space, Table } from "antd";
import { categoryDelete, categoryStatus } from "@/services";
import { CATEGORY_TYPE, MESSAGE, STATUS } from "@/lib/constants";
import type { TableProps } from "antd";
import type { CategoryTableData, CategoryTableParams, Status as StatusType } from "@/types";

import Status from "../common/Status/Status";

const CategoryTable = ({ data, total, handleRefresh, handleSet }: CategoryTableParams) => {
	const handleChangeStatus = useCallback(
		(id: number, status: StatusType) => {
			categoryStatus({ id, status }).then(() => {
				message.success(MESSAGE.UPDATE_SUCCESS);
				handleRefresh();
			});
		},
		[handleRefresh],
	);

	const handleDelete = useCallback(
		(id: number) => {
			categoryDelete({ id }).then(() => {
				message.success(MESSAGE.DELETE_SUCCESS);
				handleRefresh();
			});
		},
		[handleRefresh],
	);

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
			render: type => <>{type === CATEGORY_TYPE.DISH ? "菜品分类" : "套餐分类"}</>,
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
						onClick={() =>
							handleChangeStatus(
								record.key,
								record.status === STATUS.ENABLED ? STATUS.DISABLED : STATUS.ENABLED,
							)
						}
					>
						{record.status === STATUS.ENABLED ? "禁用" : "启用"}
					</a>
				</Space>
			),
		},
	];

	return (
		<Table
			column={{ align: "center" }}
			columns={columns}
			dataSource={data}
			pagination={{
				total: total,
				pageSizeOptions: [10],
				showTotal: total => `共 ${total} 条`,
				showSizeChanger: true,
				showQuickJumper: true,
			}}
			onChange={pagination => {
				const current = pagination.current ?? 1;
				handleRefresh(current);
			}}
		/>
	);
};

export default CategoryTable;
