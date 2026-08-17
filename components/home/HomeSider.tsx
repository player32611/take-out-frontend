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

const { Sider } = Layout;

const HomeSider = () => {
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
			key: "2",
			icon: <BarChartOutlined />,
			label: "数据统计",
		},
		{
			key: "3",
			icon: <ReconciliationFilled />,
			label: "订单管理",
		},
		{
			key: "4",
			icon: <GiftFilled />,
			label: "套餐管理",
		},
		{
			key: "5",
			icon: <CoffeeOutlined />,
			label: "菜品管理",
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
		<Sider>
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
