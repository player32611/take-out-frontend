"use client";

import { useCallback, useEffect, useState } from "react";
import { Layout } from "antd";
import type { Status } from "@/types";

import HomeHeader from "./HomeHeader";
import HomeSider from "./HomeSider";
import HomeSetModal from "./HomeSetModal";
import { shopGetStatus } from "@/services";

const { Content, Footer } = Layout;

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
	const [shopStatus, setShopStatus] = useState<Status | null>(null);
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [collapsed, setCollapsed] = useState<boolean>(false);

	const handleRefresh = useCallback(() => {
		shopGetStatus().then(res => {
			setShopStatus(res.data);
		});
	}, []);

	const handleSet = useCallback(() => {
		setModalOpen(true);
	}, []);

	useEffect(() => {
		handleRefresh();
	}, [handleRefresh]);

	return (
		<>
			<HomeHeader
				collapsed={collapsed}
				status={shopStatus}
				setCollapsed={setCollapsed}
				handleSetStart={handleSet}
			/>
			<Layout>
				<HomeSider collapsed={collapsed} />
				<Layout>
					<Content style={{ margin: "24px 16px 0", display: "flex" }}>
						<div
							style={{
								padding: 24,
								minHeight: 360,
								background: "#ffffff",
								borderRadius: 8,
								flex: 1,
							}}
						>
							{children}
						</div>
					</Content>
					<Footer style={{ textAlign: "center" }}>Ant Design ©2026 Created by Ant UED</Footer>
				</Layout>
			</Layout>
			<HomeSetModal
				open={modalOpen}
				status={shopStatus}
				handleClose={() => setModalOpen(false)}
				handleSuccess={handleRefresh}
			/>
		</>
	);
};

export default HomeLayout;
