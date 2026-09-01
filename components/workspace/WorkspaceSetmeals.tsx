"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, Flex, Space, Typography } from "antd";
import { RightOutlined, TagsOutlined, TagsFilled } from "@ant-design/icons";
import { workspaceSetmeals } from "@/services";

const { Text, Title } = Typography;

const WorkspaceSetmeals = () => {
	const router = useRouter();
	const [discontinued, setDiscontinued] = useState<number>(0);
	const [sold, setSold] = useState<number>(0);

	const handleCheck = useCallback(() => {
		router.push("/setmeal");
	}, [router]);

	useEffect(() => {
		workspaceSetmeals().then(res => {
			setDiscontinued(res.data.discontinued);
			setSold(res.data.sold);
		});
	}, []);

	return (
		<Space vertical style={{ width: "100%" }}>
			<Flex align="center" justify="space-between">
				<Text strong>套餐总览</Text>
				<Button
					color="default"
					variant="link"
					icon={<RightOutlined />}
					iconPlacement="end"
					onClick={handleCheck}
				>
					套餐管理
				</Button>
			</Flex>
			<Flex gap={20}>
				<Flex flex={1}>
					<Card style={{ width: "100%", backgroundColor: "#ff99000e" }}>
						<Flex justify="space-between">
							<Space>
								<TagsOutlined />
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
								<TagsFilled />
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

export default WorkspaceSetmeals;
