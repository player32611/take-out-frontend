import { useEffect, useState } from "react";
import { Form, Input, InputNumber, message, Modal } from "antd";
import { categoryUpdate } from "@/services";
import { MESSAGE } from "@/lib/constants";
import type { CategoryModalData, CategorySetModalParams } from "@/types/components";

const CategorySetModal = ({ open, record, handleClose, handleSuccess }: CategorySetModalParams) => {
	const [form] = Form.useForm();
	const [isLoading, setIsLoading] = useState(false);

	const formFinish = (data: CategoryModalData) => {
		if (!record) return;
		setIsLoading(true);
		categoryUpdate({
			id: record.key,
			name: data.name,
			sort: data.sort,
			type: record.type,
		})
			.then(() => {
				message.success(MESSAGE.UPDATE_SUCCESS);
				handleSuccess();
				handleClose();
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	useEffect(() => {
		if (!record) return;
		form.setFieldsValue({
			name: record.name,
			sort: record.sort,
		});
	}, [open, record, form]);

	return (
		<Modal
			title="修改分类"
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
					label="分类名称"
					rules={[{ required: true, message: "请输入分类名称!", whitespace: true }]}
				>
					<Input placeholder="请输入分类名称" />
				</Form.Item>

				<Form.Item name="sort" label="排序" rules={[{ required: true, message: "请输入排序!" }]}>
					<InputNumber placeholder="请输入排序" min={1} style={{ width: "100%" }} />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default CategorySetModal;
