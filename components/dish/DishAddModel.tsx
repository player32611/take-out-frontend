import { useEffect, useState } from "react";
import { Form, Input, InputNumber, message, Modal, Select, Space, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { categoryList, commonUpload } from "@/services";
import type { DishAddModelData, DishAddModelParams } from "@/types/components";
import type { SelectProps } from "antd/es/select";
import type { UploadProps } from "antd/es/upload";

const DishAddModel = ({ open, handleClose, handleSuccess }: DishAddModelParams) => {
	const [form] = Form.useForm();
	const [typeList, setTypeList] = useState<SelectProps["options"]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const formFinish = (data: DishAddModelData) => {};

	const handleUpload: UploadProps["customRequest"] = ({ file, onSuccess, onError }) => {
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

	useEffect(() => {
		categoryList({ type: 1 }).then(res => {
			setTypeList(
				res.data.map(record => ({
					label: record.name,
					value: record.id,
				})),
			);
		});
	}, [open]);

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
					name="categoryId"
					label="菜品分类"
					rules={[{ required: true, message: "请选择菜品分类!" }]}
				>
					<Select placeholder="请选择菜品分类" options={typeList} />
				</Form.Item>

				<Form.Item
					name="price"
					label="菜品价格"
					rules={[{ required: true, message: "请设置菜品价格!" }]}
				>
					<InputNumber placeholder="请设置菜品价格" min={0} style={{ width: "100%" }} />
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
					extra="支持 JPG、PNG 格式，图片大小不超过 2MB，建议上传200*200或300*300尺寸的图片"
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
