"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, Flex, Space, Typography } from "antd";
import { RightOutlined, TagOutlined, TagFilled } from "@ant-design/icons";
import { workspaceDishes } from "@/services";

const { Text, Title } = Typography;

const WorkspaceDishes = () => {
	const router = useRouter();
	const [discontinued, setDiscontinued] = useState<number>(0);
	const [sold, setSold] = useState<number>(0);

	const handleCheck = useCallback(() => {
		router.push("/dish");
	}, [router]);

	useEffect(() => {
		workspaceDishes().then(res => {
			setDiscontinued(res.data.discontinued);
			setSold(res.data.sold);
		});
	}, []);

	return (
		<Space vertical style={{ width: "100%" }}>
			<Flex align="center" justify="space-between">
				<Text strong>菜品总览</Text>
				<Button
					color="default"
					variant="link"
					icon={<RightOutlined />}
					iconPlacement="end"
					onClick={handleCheck}
				>
					菜品管理
				</Button>
			</Flex>
			<Flex gap={20}>
				<Flex flex={1}>
					<Card style={{ width: "100%", backgroundColor: "#ff99000e" }}>
						<Flex justify="space-between">
							<Space>
								<TagOutlined />
								<Text>已起售</Text>
							</Space>
							<Title level={3} type="danger" style={{ margin: 0 }}>
								{sold}
							</Title>
						</Flex>
					</Card>
				</Flex>

				<Flex flex={1}>
					<Card style={{ width: "100%", backgroundColor: "#ff99000e" }}>
						<Flex justify="space-between">
							<Space>
								<TagFilled />
								<Text>已停售</Text>
							</Space>
							<Title level={3} type="danger" style={{ margin: 0 }}>
								{discontinued}
							</Title>
						</Flex>
					</Card>
				</Flex>
			</Flex>
		</Space>
	);
};

export default WorkspaceDishes;
