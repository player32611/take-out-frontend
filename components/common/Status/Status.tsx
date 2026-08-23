import { Space } from "antd";
import { STATUS } from "@/lib/constants";
import type { StatusParams } from "@/types/components";

import style from "./status.module.scss";

const Status = ({ status, disableText = "禁用", enableText = "启用" }: StatusParams) => {
	return (
		<Space className={`${style.status} ${status ? style.active : ""}`} align="center">
			{status === STATUS.DISABLED ? disableText : enableText}
		</Space>
	);
};

export default Status;
