"use client";

import { useCallback, useEffect, useState } from "react";
import { Layout } from "antd";
import { shopGetStatus } from "@/services";
import type { Status } from "@/types";

import HomeHeader from "./HomeHeader";
import HomeSider from "./HomeSider";
import HomeSetModal from "./HomeSetModal";

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
		<Layout
			style={{
				display: "flex",
				flexDirection: "column",
				height: "100vh",
				width: "100vw",
				maxHeight: "100vh",
				maxWidth: "100vw",
			}}
		>
			<HomeHeader
				collapsed={collapsed}
				status={shopStatus}
				setCollapsed={setCollapsed}
				handleSetStart={handleSet}
			/>
			<div style={{ flex: 1, display: "flex", height: "calc(100% - 64px)" }}>
				<HomeSider collapsed={collapsed} />
				<Layout style={{ display: "flex", flexDirection: "column", maxHeight: "100%" }}>
					<Content style={{ flex: 1, margin: "16px 16px 0" }}>
						<div
							style={{
								padding: 24,
								height: "100%",
								background: "#ffffff",
								borderRadius: 8,
								overflow: "auto",
							}}
						>
							{children}
						</div>
					</Content>
					<Footer style={{ textAlign: "center" }}>Ant Design ©2026 Created by Ant UED</Footer>
				</Layout>
			</div>
			<HomeSetModal
				open={modalOpen}
				status={shopStatus}
				handleClose={() => setModalOpen(false)}
				handleSuccess={handleRefresh}
			/>
		</Layout>
	);
};

export default HomeLayout;
