import { useEffect, useState } from "react";
import { employeeId, employeeUpdate } from "@/services";
import { Form, Input, message, Modal, Radio } from "antd";
import type { EmployeeSetModelData, EmployeeSetModelParams } from "@/types/components";

import PhoneInput from "@/components/common/PhoneInput";

const EmployeeSetModel = ({ open, id, handleClose, handleSuccess }: EmployeeSetModelParams) => {
	const [form] = Form.useForm();
	const [isLoading, setIsLoading] = useState(true);

	const formFinish = (data: EmployeeSetModelData) => {
		if (!id) return;
		setIsLoading(true);
		employeeUpdate({
			id,
			idNumber: data.idNumber,
			name: data.name,
			phone: data.phone.phone,
			sex: data.sex,
			username: data.username,
		})
			.then(() => {
				message.success("修改成功");
				handleSuccess();
				handleClose();
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	useEffect(() => {
		if (id && form) {
			employeeId({ id })
				.then(res => {
					form.setFieldsValue({
						name: res.data.name,
						username: res.data.username,
						phone: { phone: res.data.phone },
						sex: res.data.sex,
						idNumber: res.data.idNumber,
					});
				})
				.finally(() => setIsLoading(false));
		}
	}, [id, form]);

	return (
		<Modal
			title="修改员工信息"
			open={open}
			cancelText="取消"
			onCancel={handleClose}
			onOk={() => form.submit()}
			okButtonProps={{ type: "primary", loading: isLoading }}
			okText="保存"
		>
			<Form
				form={form}
				name="employeeSet"
				initialValues={{
					phone: { prefix: "86" },
				}}
				onFinish={formFinish}
			>
				<Form.Item
					name="name"
					label="账号"
					rules={[{ required: true, message: "请输入账号!", whitespace: true }]}
				>
					<Input placeholder="请输入账号" />
				</Form.Item>

				<Form.Item
					name="username"
					label="员工姓名"
					rules={[{ required: true, message: "请输入员工姓名!" }]}
				>
					<Input placeholder="请输入员工姓名" />
				</Form.Item>

				<Form.Item
					name="phone"
					label="手机号"
					rules={[{ required: true, message: "请输入手机号!" }]}
				>
					<PhoneInput />
				</Form.Item>

				<Form.Item name="sex" label="性别" rules={[{ required: true, message: "请选择性别!" }]}>
					<Radio.Group>
						<Radio value="男"> 男 </Radio>
						<Radio value="女"> 女 </Radio>
					</Radio.Group>
				</Form.Item>

				<Form.Item
					name="idNumber"
					label="身份证号"
					rules={[{ required: true, message: "请输入身份证号!" }]}
				>
					<Input placeholder="请输入身份证号" />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default EmployeeSetModel;
