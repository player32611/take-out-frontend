import { Space } from "antd";
import type { Status } from "@/types/common";

import style from "./status.module.scss";

const Status = ({ status }: { status: Status }) => {
	return (
		<Space className={`${style.status} ${status ? style.active : ""}`} align="center">
			{status ? "启用" : "禁用"}
		</Space>
	);
};

export default Status;
