import { Button, Flex, Layout, Select, Space, Tag } from "antd";
import { ClockCircleFilled, MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { STATUS } from "@/lib";
import type { HomeHeaderParams } from "@/types/components";

const { Header } = Layout;

const HomeHeader = ({ collapsed, status, setCollapsed, handleSetStart }: HomeHeaderParams) => {
	return (
		<Header
			style={{
				padding: 0,
				display: "flex",
				alignItems: "center",
				background: "#ffaa00",
			}}
		>
			<div className="demo-logo" style={{ width: 200, height: 50, backgroundColor: "red" }} />
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
				<Space size="large">
					<Button
						variant="link"
						color="default"
						icon={<ClockCircleFilled />}
						onClick={handleSetStart}
					>
						营业状态设置
					</Button>

					<Select style={{ width: 150, marginRight: 10 }} />
				</Space>
			</Flex>
		</Header>
	);
};

export default HomeHeader;
