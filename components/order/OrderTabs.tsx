"use client";

import { Tabs } from "antd";
import { ORDER_STATUS } from "@/lib";
import type { TabsProps } from "antd";
import type { OrderTabsParams } from "@/types";

const OrderTabs = ({
	tab,
	confirmed,
	deliveryInProgress,
	toBeConfirmed,
	handleChange,
}: OrderTabsParams) => {
	const onChange = (key: string) => {
		handleChange(Number(key));
	};

	const items: TabsProps["items"] = [
		{
			key: "0",
			label: "全部订单",
		},
		{
			key: ORDER_STATUS.TO_BE_CONFIRMED.toString(),
			label: `待接单(${toBeConfirmed})`,
		},
		{
			key: ORDER_STATUS.CONFIRMED.toString(),
			label: `待派送(${confirmed})`,
		},
		{
			key: ORDER_STATUS.DELIVERY_IN_PROGRESS.toString(),
			label: `派送中(${deliveryInProgress})`,
		},
		{
			key: ORDER_STATUS.COMPLETED.toString(),
			label: "已完成",
		},
		{
			key: ORDER_STATUS.CANCELLED.toString(),
			label: "已取消",
		},
	];

	return <Tabs activeKey={`${tab}`} items={items} onChange={onChange} />;
};

export default OrderTabs;
