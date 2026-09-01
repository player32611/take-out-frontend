import { Col, Row, Space } from "antd";

import WorkspaceBusiness from "@/components/workspace/WorkspaceBusiness";
import WorkspaceOrders from "@/components/workspace/WorkspaceOrders";
import WorkspaceDishes from "@/components/workspace/WorkspaceDishes";
import WorkspaceSetmeals from "@/components/workspace/WorkspaceSetmeals";

const Workspace = () => {
	return (
		<Space vertical style={{ width: "100%" }}>
			<WorkspaceBusiness />
			<WorkspaceOrders />
			<Row gutter={16}>
				<Col span={12}>
					<WorkspaceDishes />
				</Col>
				<Col span={12}>
					<WorkspaceSetmeals />
				</Col>
			</Row>
		</Space>
	);
};

export default Workspace;
