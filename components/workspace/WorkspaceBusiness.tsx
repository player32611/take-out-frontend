"use client";

import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, Flex, Space, Statistic, Typography } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { workspaceBusiness } from "@/services";

const { Text } = Typography;

const WorkspaceBusiness = () => {
	const router = useRouter();
	const [newUsers, setNewUsers] = useState<number>(0);
	const [completionRate, setCompletionRate] = useState<number>(0);
	const [turnover, setTurnover] = useState<number>(0);
	const [unitPrice, setUnitPrice] = useState<number>(0);
	const [orderCount, setOrderCount] = useState<number>(0);

	const handleCheck = useCallback(() => {
		router.push("/report");
	}, [router]);

	useEffect(() => {
		workspaceBusiness().then(res => {
			setNewUsers(res.data.newUsers);
			setCompletionRate(res.data.orderCompletionRate);
			setTurnover(res.data.turnover);
			setUnitPrice(res.data.unitPrice);
			setOrderCount(res.data.validOrderCount);
		});
	}, []);

	return (
		<Space vertical style={{ width: "100%" }}>
			<Flex align="center" justify="space-between">
				<Space>
					<Text strong>今日数据</Text>
					<Text type="secondary">{dayjs().format("YYYY.MM.DD")}</Text>
				</Space>
				<Button
					color="default"
					variant="link"
					icon={<RightOutlined />}
					iconPlacement="end"
					onClick={handleCheck}
				>
					详细数据
				</Button>
			</Flex>
			<Flex gap={20}>
				<Flex flex={1}>
					<Card style={{ width: "100%", backgroundColor: "#ff99000e" }}>
						<Statistic title="营业额" value={turnover} prefix="￥" />
					</Card>
				</Flex>

				<Flex flex={1}>
					<Card style={{ width: "100%", backgroundColor: "#ff99000e" }}>
						<Statistic title="有效订单" value={orderCount} />
					</Card>
				</Flex>

				<Flex flex={1}>
					<Card style={{ width: "100%", backgroundColor: "#ff99000e" }}>
						<Statistic title="订单完成率" value={completionRate * 100} suffix="%" />
					</Card>
				</Flex>

				<Flex flex={1}>
					<Card style={{ width: "100%", backgroundColor: "#ff99000e" }}>
						<Statistic title="平均客单价" value={unitPrice} prefix="￥" />
					</Card>
				</Flex>

				<Flex flex={1}>
					<Card style={{ width: "100%", backgroundColor: "#ff99000e" }}>
						<Statistic title="新增用户" value={newUsers} />
					</Card>
				</Flex>
			</Flex>
		</Space>
	);
};

export default WorkspaceBusiness;
