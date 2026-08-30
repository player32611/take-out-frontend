"use client";

import { Button, DatePicker, Flex, Input, Space } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import { orderSearch, orderStatistics } from "@/services";
import { PAGE_SIZE } from "@/lib";
import type { OrderDetailsModalRef, OrderStatus, OrderTableData } from "@/types";
import type { Dayjs } from "dayjs";

import OrderTabs from "@/components/order/OrderTabs";
import OrderTable from "@/components/order/OrderTable";
import OrderDetailsModal from "@/components/order/OrderDetailsModal";
import OrderReasonModal from "@/components/order/OrderReasonModal";

const { RangePicker } = DatePicker;

const Order = () => {
	const [confirmedAmount, setConfirmedAmount] = useState<number>(0);
	const [deliveryInProgressAmount, setDeliveryInProgressAmount] = useState<number>(0);
	const [toBeConfirmedAmount, setToBeConfirmedAmount] = useState<number>(0);
	const [selectTab, setSelectTab] = useState<OrderStatus | 0>(0);
	const [searchNumber, setSearchNumber] = useState<string>("");
	const [searchDate, setSearchDate] = useState<[Dayjs | null, Dayjs | null] | null>(null);
	const [searchPhone, setSearchPhone] = useState<string>("");
	const [tableData, setTableData] = useState<OrderTableData[]>([]);
	const [tableTotal, setTableTotal] = useState<number>(0);
	const [checkId, setCheckId] = useState<number | null>(null);
	const [reasonType, setReasonType] = useState<"拒单" | "取消">("拒单");
	const [detailsModalOpen, setDetailsModalOpen] = useState<boolean>(false);
	const [reasonModalOpen, setReasonModalOpen] = useState<boolean>(false);

	const detailModalRef = useRef<OrderDetailsModalRef | null>(null);

	const handleRefresh = useCallback(
		(page: number = 1) => {
			orderSearch({
				beginTime: searchDate?.[0]?.format("YYYY-MM-DDTHH:mm:ss") || undefined,
				endTime: searchDate?.[1]?.format("YYYY-MM-DDTHH:mm:ss") || undefined,
				number: searchNumber,
				pageSize: PAGE_SIZE,
				page,
				phone: searchPhone,
				status: selectTab || undefined,
			}).then(res => {
				setTableData(
					res.data.records.map(record => ({
						key: record.id,
						number: record.number,
						status: record.status,
						userName: record.userName || "未知",
						phone: record.phone,
						address: record.address,
						orderTime: record.orderTime,
						amount: record.amount,
					})),
				);
				setTableTotal(res.data.total);
			});

			orderStatistics().then(res => {
				setConfirmedAmount(res.data.confirmed);
				setDeliveryInProgressAmount(res.data.deliveryInProgress);
				setToBeConfirmedAmount(res.data.toBeConfirmed);
			});
		},
		[searchDate, searchNumber, searchPhone, selectTab],
	);

	const handleChangeTab = useCallback((tab: OrderStatus) => {
		setSelectTab(tab);
	}, []);

	const handleCheck = useCallback((id: number) => {
		setCheckId(id);
		setDetailsModalOpen(true);
	}, []);

	const handleReason = useCallback((id: number, type: "拒单" | "取消") => {
		setCheckId(id);
		setReasonType(type);
		setReasonModalOpen(true);
	}, []);

	const handleSuccess = useCallback(() => {
		handleRefresh();
		detailModalRef.current?.renewData();
	}, [handleRefresh]);

	useEffect(() => {
		handleRefresh();
	}, [handleRefresh]);

	return (
		<div>
			<OrderTabs
				tab={selectTab}
				confirmed={confirmedAmount}
				deliveryInProgress={deliveryInProgressAmount}
				toBeConfirmed={toBeConfirmedAmount}
				handleChange={handleChangeTab}
			/>
			<Flex align="center" justify="space-between">
				<Space align="center">
					订单号：
					<Input
						placeholder="请填写订单号"
						value={searchNumber}
						onChange={e => setSearchNumber(e.target.value)}
						allowClear
					/>
					手机号：
					<Input
						placeholder="请填写手机号"
						value={searchPhone}
						onChange={e => setSearchPhone(e.target.value)}
						allowClear
					/>
					<RangePicker showTime onChange={e => setSearchDate(e)} />
					<Button type="primary" onClick={() => handleRefresh()}>
						查询
					</Button>
				</Space>
			</Flex>
			<OrderTable
				data={tableData}
				total={tableTotal}
				handleRefresh={handleRefresh}
				handleCheck={handleCheck}
				handleReason={handleReason}
			/>
			<OrderDetailsModal
				open={detailsModalOpen}
				id={checkId}
				handleRefresh={handleRefresh}
				handleClose={() => setDetailsModalOpen(false)}
				handleReason={handleReason}
				ref={detailModalRef}
			/>
			<OrderReasonModal
				open={reasonModalOpen}
				id={checkId}
				type={reasonType}
				handleClose={() => setReasonModalOpen(false)}
				handleSuccess={handleSuccess}
			/>
		</div>
	);
};

export default Order;
