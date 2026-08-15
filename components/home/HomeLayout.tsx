"use client";

import { Layout } from "antd";

const { Header, Content, Footer } = Layout;

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
	const currentYear = new Date().getFullYear();

	return (
		<Layout>
			<Header style={{ padding: 0, background: "#ffffff" }} />
			<Content style={{ margin: "24px 16px 0" }}>
				<div
					style={{
						padding: 24,
						minHeight: 360,
						background: "#ffffff",
						borderRadius: 8,
					}}
				>
					{children}
				</div>
			</Content>
			<Footer style={{ textAlign: "center" }}>Ant Design ©{currentYear} Created by Ant UED</Footer>
		</Layout>
	);
};

export default HomeLayout;
