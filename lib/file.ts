import { commonUpload } from "@/services";
import { message } from "antd";
import type { UploadProps } from "antd";

export const fileUpload: UploadProps["customRequest"] = ({ file, onSuccess, onError }) => {
	if (!(file instanceof File)) {
		message.error("文件类型错误");
		onError?.(new Error("文件类型错误"));
		return;
	}

	commonUpload({ file })
		.then(res => {
			onSuccess?.(res.data);
		})
		.catch(err => {
			onError?.(err);
		});
};
