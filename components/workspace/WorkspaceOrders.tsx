"use client";

import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, Flex, Space, Typography } from "antd";
import {
	ExceptionOutlined,
	FileExcelOutlined,
	FileDoneOutlined,
	FileOutlined,
	RightOutlined,
	TruckFilled,
} from "@ant-design/icons";
import { workspaceOrders } from "@/services";

const { Text, Title } = Typography;

const WorkspaceOrders = () => {
	const router = useRouter();
	const [allOrders, setAllOrders] = useState<number>(0);
	const [cancelledOrders, setCancelledOrders] = useState<number>(0);
	const [completedOrders, setCompletedOrders] = useState<number>(0);
	const [deliveredOrders, setDeliveredOrders] = useState<number>(0);
	const [waitingOrders, setWaitingOrders] = useState<number>(0);

	const handleCheck = useCallback(() => {
		router.push("/order");
	}, [router]);

	useEffect(() => {
		workspaceOrders().then(res => {
			setAllOrders(res.data.allOrders);
			setCancelledOrders(res.data.cancelledOrders);
			setCompletedOrders(res.data.completedOrders);
			setDeliveredOrders(res.data.deliveredOrders);
			setWaitingOrders(res.data.waitingOrders);
		});
	}, []);

	return (
		<Space vertical style={{ width: "100%" }}>
			<Flex align="center" justify="space-between">
				<Space>
					<Text strong>订单管理</Text>
					<Text type="secondary">{dayjs().format("YYYY.MM.DD")}</Text>
				</Space>
				<Button
					color="default"
					variant="link"
					icon={<RightOutlined />}
					iconPlacement="end"
					onClick={handleCheck}
				>
					订单明细
				</Button>
			</Flex>

			<Flex gap={20}>
				<Flex flex={1}>
					<Card style={{ width: "100%", backgroundColor: "#ff99000e" }}>
						<Flex justify="space-between">
							<Space>
								<ExceptionOutlined />
								<Text>待接单</Text>
							</Space>
							<Title level={3} type="danger" style={{ margin: 0 }}>
								{waitingOrders}
							</Title>
						</Flex>
					</Card>
				</Flex>

				<Flex flex={1}>
					<Card style={{ width: "100%", backgroundColor: "#ff99000e" }}>
						<Flex justify="space-between">
							<Space>
								<TruckFilled />
								<Text>待派送</Text>
							</Space>
							<Title level={3} type="danger" style={{ margin: 0 }}>
								{deliveredOrders}
							</Title>
						</Flex>
					</Card>
				</Flex>

				<Flex flex={1}>
					<Card style={{ width: "100%", backgroundColor: "#ff99000e" }}>
						<Flex justify="space-between">
							<Space>
								<FileDoneOutlined />
								<Text>已完成</Text>
							</Space>
							<Title level={3} style={{ margin: 0 }}>
								{completedOrders}
							</Title>
						</Flex>
					</Card>
				</Flex>

				<Flex flex={1}>
					<Card style={{ width: "100%", backgroundColor: "#ff99000e" }}>
						<Flex justify="space-between">
							<Space>
								<FileExcelOutlined />
								<Text>已取消</Text>
							</Space>
							<Title level={3} style={{ margin: 0 }}>
								{cancelledOrders}
							</Title>
						</Flex>
					</Card>
				</Flex>

				<Flex flex={1}>
					<Card style={{ width: "100%", backgroundColor: "#ff99000e" }}>
						<Flex justify="space-between">
							<Space>
								<FileOutlined />
								<Text>全部订单</Text>
							</Space>
							<Title level={3} style={{ margin: 0 }}>
								{allOrders}
							</Title>
						</Flex>
					</Card>
				</Flex>
			</Flex>
		</Space>
	);
};

export default WorkspaceOrders;
