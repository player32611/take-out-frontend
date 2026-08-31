"use client";

import { Layout, notification } from "antd";
import { useWebSocket } from "@/hooks/useWebSocket";
import { REMINDER_STATUS } from "@/lib";
import type { WebSocketMessageData } from "@/types";

import HomeLayout from "@/components/home/HomeLayout";
import style from "./home.module.scss";

const Home = ({ children }: { children: React.ReactNode }) => {
	const [api, contextHolder] = notification.useNotification();
	useWebSocket("ws://localhost:8080/es/10001", {
		onMessage: (message: WebSocketMessageData) => {
			if (message.type === REMINDER_STATUS.PAY) {
				api.info({
					title: "待接单",
					description: (
						<>
							您有 1 个<a>订单待处理</a>,{message.message},请及时接单
						</>
					),
				});
			} else if (message.type === REMINDER_STATUS.USER) {
				api.info({
					title: "催单",
					description: (
						<>
							{message.message}
							<a>去处理</a>
						</>
					),
				});
			}
		},
	});

	return (
		<Layout className={style.home}>
			{contextHolder}
			<HomeLayout>{children}</HomeLayout>
		</Layout>
	);
};

export default Home;
