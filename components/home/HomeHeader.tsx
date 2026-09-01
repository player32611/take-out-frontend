"use client";

import { Avatar, Button, Dropdown, Flex, Layout, Space, Tag, Typography } from "antd";
import {
	ClockCircleFilled,
	GithubFilled,
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { removeName, removeToken, STATUS, getName } from "@/lib";
import { employeeLogout } from "@/services";
import { useRouter } from "next/navigation";
import type { HomeHeaderParams } from "@/types";
import type { MenuProps } from "antd";
import { useEffect, useState } from "react";

const { Header } = Layout;

const { Title } = Typography;

const HomeHeader = ({ collapsed, status, setCollapsed, handleSetStart }: HomeHeaderParams) => {
	const router = useRouter();
	const [name, setName] = useState<string>("未知");

	useEffect(() => {
		setName(getName() || "未知");
	}, []);

	const items: MenuProps["items"] = [
		{
			key: "logout",
			danger: true,
			label: "退出登录",
			onClick: () => {
				employeeLogout().then(() => {
					removeToken();
					removeName();
					router.push("/login");
				});
			},
		},
	];

	return (
		<Header
			style={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				gap: 10,
				background: "#ffaa00",
			}}
		>
			<Flex gap={10} style={{ cursor: "pointer" }} onClick={() => router.push("/")}>
				<GithubFilled style={{ fontSize: 30 }} />
				<Title level={3} style={{ margin: 0 }}>
					开源购物
				</Title>
			</Flex>
			<Flex align="center" justify="space-between" style={{ flex: 1 }}>
				<Space>
					<Button
						type="text"
						icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
						onClick={() => setCollapsed(!collapsed)}
						style={{
							fontSize: "16px",
							width: 64,
							height: 64,
						}}
					/>
					<Tag color="red" variant="solid">
						{status === null ? "未知" : status === STATUS.ENABLED ? "营业中" : "打烊中"}
					</Tag>
				</Space>
				<Space size="medium" align="center">
					<Button
						variant="link"
						color="default"
						icon={<ClockCircleFilled />}
						onClick={handleSetStart}
					>
						营业状态设置
					</Button>
					<Dropdown menu={{ items }}>
						<a onClick={e => e.preventDefault()}>
							<Space>
								<Avatar size="medium" icon={<UserOutlined />} />
								<Title level={4} style={{ margin: 0 }}>
									{name}
								</Title>
							</Space>
						</a>
					</Dropdown>
				</Space>
			</Flex>
		</Header>
	);
};

export default HomeHeader;
