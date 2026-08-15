"use client";

import { Layout, Menu } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Sider } = Layout;

const items = [
	{
		key: "1",
		icon: <UploadOutlined />,
		label: "工作台",
	},
	{
		key: "2",
		icon: <UploadOutlined />,
		label: "数据统计",
	},
	{
		key: "3",
		icon: <UploadOutlined />,
		label: "订单管理",
	},
	{
		key: "4",
		icon: <UploadOutlined />,
		label: "套餐管理",
	},
	{
		key: "5",
		icon: <UploadOutlined />,
		label: "菜品管理",
	},
	{
		key: "6",
		icon: <UploadOutlined />,
		label: "分类管理",
	},
	{
		key: "7",
		icon: <UploadOutlined />,
		label: "员工管理",
	},
];

const HomeSider = () => {
	return (
		<Sider>
			<Menu
				theme="dark"
				mode="inline"
				defaultSelectedKeys={["1"]}
				items={items}
				style={{ height: "100vh" }}
			/>
		</Sider>
	);
};

export default HomeSider;
