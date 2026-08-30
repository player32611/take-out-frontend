import { message, Space, Table } from "antd";
import { useCallback } from "react";
import { orderComplete, orderConfirm, orderDelivery } from "@/services";
import { MESSAGE, ORDER_STATUS } from "@/lib";
import type { TableProps } from "antd";
import type { OrderTableData, OrderTableParams, OrderStatus } from "@/types";

const OrderTable = ({
	data,
	total,
	handleRefresh,
	handleCheck,
	handleReason,
}: OrderTableParams) => {
	const handleDelivery = useCallback(
		(id: number) => {
			orderDelivery({ id }).then(() => {
				message.success(MESSAGE.DELIVER_SUCCESS);
				handleRefresh();
			});
		},
		[handleRefresh],
	);

	const handleConfirm = useCallback(
		(id: number) => {
			orderConfirm({ id }).then(() => {
				message.success(MESSAGE.ORDER_CONFIRM_SUCCESS);
				handleRefresh();
			});
		},
		[handleRefresh],
	);

	const handleComplete = useCallback(
		(id: number) => {
			orderComplete({ id }).then(() => {
				message.success(MESSAGE.ORDER_COMPLETE_SUCCESS);
				handleRefresh();
			});
		},
		[handleRefresh],
	);

	const columns: TableProps<OrderTableData>["columns"] = [
		{
			title: "订单号",
			dataIndex: "number",
			key: "number",
		},
		{
			title: "订单状态",
			dataIndex: "status",
			key: "status",
			render: (status: OrderStatus) => (
				<a>
					{status === ORDER_STATUS.PENDING_PAYMENT
						? "待付款"
						: status === ORDER_STATUS.TO_BE_CONFIRMED
							? "待接单"
							: status === ORDER_STATUS.CONFIRMED
								? "待派送"
								: status === ORDER_STATUS.DELIVERY_IN_PROGRESS
									? "派送中"
									: status === ORDER_STATUS.COMPLETED
										? "已完成"
										: status === ORDER_STATUS.CANCELLED
											? "已取消"
											: "未知"}
				</a>
			),
		},
		{
			title: "用户名",
			dataIndex: "userName",
			key: "userName",
		},
		{
			title: "手机号",
			dataIndex: "phone",
			key: "phone",
		},
		{
			title: "地址",
			dataIndex: "address",
			key: "address",
		},
		{
			title: "下单时间",
			dataIndex: "orderTime",
			key: "orderTime",
		},
		{
			title: "实收金额",
			dataIndex: "amount",
			key: "amount",
			render: (text: number) => <div>{text.toFixed(2)}</div>,
		},
		{
			title: "操作",
			key: "action",
			render: (_, record) => (
				<Space size="medium">
					{record.status === ORDER_STATUS.TO_BE_CONFIRMED ? (
						<>
							<a onClick={() => handleConfirm(record.key)}>接单</a>
							<a onClick={() => handleReason(record.key, "拒单")}>拒单</a>
						</>
					) : null}
					{record.status === ORDER_STATUS.CONFIRMED ? (
						<a onClick={() => handleDelivery(record.key)}>派送</a>
					) : null}
					{record.status === ORDER_STATUS.COMPLETED ? (
						<a onClick={() => message.error("退单功能暂不支持")}>退单</a>
					) : null}
					{record.status === ORDER_STATUS.DELIVERY_IN_PROGRESS ? (
						<a onClick={() => handleComplete(record.key)}>完成</a>
					) : null}
					{record.status === ORDER_STATUS.PENDING_PAYMENT ||
					record.status === ORDER_STATUS.CONFIRMED ||
					record.status === ORDER_STATUS.DELIVERY_IN_PROGRESS ? (
						<a onClick={() => handleReason(record.key, "取消")}>取消</a>
					) : null}
					<a onClick={() => handleCheck(record.key)}>查看</a>
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
			onChange={pagination => handleRefresh(pagination.current ?? 1)}
		/>
	);
};

export default OrderTable;
