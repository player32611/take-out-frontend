import { useCallback, useState, useImperativeHandle } from "react";
import { Image, message, Space, Table } from "antd";
import { setmealDelete, setmealStatus } from "@/services";
import { MESSAGE } from "@/lib/constants";
import type { TableProps } from "antd";
import type { SetmealTableData, SetmealTableParams, Status as StatusType } from "@/types";

import Status from "../common/Status/Status";

const SetmealTable = ({ data, total, handleRefresh, handleSet, ref }: SetmealTableParams) => {
	const [selectKeys, setSelectKeys] = useState<number[]>([]);

	const handleChangeStatus = useCallback(
		(id: number, status: StatusType) => {
			setmealStatus({ id, status }).then(() => {
				message.success(MESSAGE.UPDATE_SUCCESS);
				handleRefresh();
			});
		},
		[handleRefresh],
	);

	const handleDelete = useCallback(
		(id?: number) => {
			if (id) {
				setmealDelete({ ids: id.toString() }).then(() => {
					message.success(MESSAGE.DELETE_SUCCESS);
					handleRefresh();
				});
			} else if (selectKeys.length) {
				setmealDelete({ ids: selectKeys.join(",") }).then(() => {
					message.success(MESSAGE.DELETE_SUCCESS);
					handleRefresh();
				});
			}
		},
		[selectKeys, handleRefresh],
	);

	const rowSelection: TableProps<SetmealTableData>["rowSelection"] = {
		onChange: (selectedRowKeys: React.Key[]) => {
			setSelectKeys(selectedRowKeys.map(key => Number(key)));
		},
	};

	const columns: TableProps<SetmealTableData>["columns"] = [
		{
			title: "套餐名称",
			dataIndex: "name",
			key: "name",
			render: text => <a>{text}</a>,
		},
		{
			title: "套餐图片",
			dataIndex: "image",
			key: "image",
			render: (src, record) => <Image width={50} height={50} src={src} alt={record.name} />,
		},
		{
			title: "套餐分类",
			dataIndex: "categoryName",
			key: "categoryName",
		},
		{
			title: "套餐价",
			dataIndex: "price",
			key: "price",
			render: price => <div>￥{price}</div>,
		},
		{
			title: "售卖状态",
			dataIndex: "status",
			key: "status",
			render: status => <Status status={status} disableText="停售" enableText="启售"></Status>,
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
					<a onClick={() => handleSet(record.key)}>修改</a>
					<a style={{ color: "red" }} onClick={() => handleDelete(record.key)}>
						删除
					</a>
					<a
						style={{ color: record.status ? "red" : "" }}
						onClick={() => handleChangeStatus(record.key, record.status ? 0 : 1)}
					>
						{record.status ? "停售" : "启售"}
					</a>
				</Space>
			),
		},
	];

	useImperativeHandle(ref, () => ({
		handleDelete,
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

export default SetmealTable;
