import { useState } from "react";
import type { RcFile, UploadProps } from "antd/es/upload";
import { Form, Input, Modal, Space, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { commonUpload } from "@/services/commonService";
import type { DishAddModelData, DishAddModelParams } from "@/types/components";

const DishAddModel = ({ open, handleClose, handleSuccess }: DishAddModelParams) => {
	const [form] = Form.useForm();
	const [isLoading, setIsLoading] = useState(false);

	const formFinish = (data: DishAddModelData) => {};

	const handleUpload: UploadProps["customRequest"] = ({ file, onSuccess, onError }) => {
		if (!(file instanceof File)) {
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

	return (
		<Modal
			title="新建菜品"
			open={open}
			cancelText="取消"
			onCancel={handleClose}
			okButtonProps={{ type: "primary", loading: isLoading }}
			okText="保存"
			onOk={() => form.submit()}
		>
			<Form
				form={form}
				name="employeeAdd"
				onFinish={formFinish}
				initialValues={{
					phone: { prefix: "86" },
				}}
			>
				<Form.Item
					name="name"
					label="菜品名称"
					rules={[{ required: true, message: "请填写菜品名称!", whitespace: true }]}
				>
					<Input placeholder="请填写菜品名称" />
				</Form.Item>

				<Form.Item
					name="price"
					label="菜品价格"
					rules={[{ required: true, message: "请填写菜品价格!", whitespace: true }]}
				>
					<Input placeholder="请填写菜品价格" />
				</Form.Item>

				{/* <Form.Item name="tast" label="口味做法配置">
					添加口味
				</Form.Item> */}

				<Form.Item
					label="菜品图片"
					name="image"
					valuePropName="fileList"
					rules={[{ required: true, message: "请上传菜品图片!" }]}
					getValueFromEvent={e => {
						if (Array.isArray(e)) {
							return e;
						}
						return e?.fileList;
					}}
				>
					<Upload name="file" listType="picture-card" maxCount={1} customRequest={handleUpload}>
						<Space orientation="vertical">
							<UploadOutlined />
							上传图片
						</Space>
					</Upload>
				</Form.Item>

				<Form.Item name="description" label="菜品描述">
					<Input.TextArea showCount maxLength={200} placeholder="菜品描述，最长200字" />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default DishAddModel;
