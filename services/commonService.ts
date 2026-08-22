import { post } from "./axios";
import type { CommonUploadParams } from "@/types/services";

export const commonUpload = ({ file }: CommonUploadParams) => {
	const formData = new FormData();
	formData.append("file", file);

	return post<string>("/admin/common/upload", formData);
};
