"use client";

import { Layout, Menu } from "antd";
import {
	BarChartOutlined,
	CoffeeOutlined,
	GiftFilled,
	HomeFilled,
	InfoCircleFilled,
	ProductFilled,
	ReconciliationFilled,
} from "@ant-design/icons";
import { useRouter, usePathname } from "next/navigation";
import type { HomeSiderParams } from "@/types";

const { Sider } = Layout;

const HomeSider = ({ collapsed }: HomeSiderParams) => {
	const router = useRouter();
	const pathname = usePathname();

	const selectedKey = pathname.startsWith("/employee") ? "/employee" : pathname;

	const items = [
		{
			key: "/",
			icon: <HomeFilled />,
			label: "工作台",
			onClick: () => router.push("/"),
		},
		{
			key: "/report",
			icon: <BarChartOutlined />,
			label: "数据统计",
			onClick: () => router.push("/report"),
		},
		{
			key: "/order",
			icon: <ReconciliationFilled />,
			label: "订单管理",
			onClick: () => router.push("/order"),
		},
		{
			key: "/setmeal",
			icon: <GiftFilled />,
			label: "套餐管理",
			onClick: () => router.push("/setmeal"),
		},
		{
			key: "/dish",
			icon: <CoffeeOutlined />,
			label: "菜品管理",
			onClick: () => router.push("/dish"),
		},
		{
			key: "/category",
			icon: <ProductFilled />,
			label: "分类管理",
			onClick: () => router.push("/category"),
		},
		{
			key: "/employee",
			icon: <InfoCircleFilled />,
			label: "员工管理",
			onClick: () => router.push("/employee"),
		},
	];

	return (
		<Sider trigger={null} collapsible collapsed={collapsed}>
			<Menu
				theme="dark"
				mode="inline"
				defaultSelectedKeys={[selectedKey]}
				items={items}
				style={{ height: "100vh" }}
			/>
		</Sider>
	);
};

export default HomeSider;
