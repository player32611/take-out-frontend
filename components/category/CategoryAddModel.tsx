import { useState } from "react";
import { Form, Input, InputNumber, message, Modal } from "antd";
import { categoryAdd } from "@/services/categoryService";
import type { CategoryAddModelData, CategoryAddModelParams } from "@/types/components";

const CategoryAddModel = ({ open, type, handleClose, handleSuccess }: CategoryAddModelParams) => {
	const [form] = Form.useForm();
	const [isLoading, setIsLoading] = useState(false);

	const formFinish = (data: CategoryAddModelData) => {
		setIsLoading(true);
		categoryAdd({ name: data.name, sort: data.sort, type })
			.then(() => {
				message.success("添加成功");
				handleSuccess();
				handleClose();
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	return (
		<Modal
			title={`新增${type === 1 ? "菜品" : "套餐"}分类`}
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
					<InputNumber placeholder="请输入排序" />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default CategoryAddModel;
