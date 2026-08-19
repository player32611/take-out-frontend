import { Button, Form, Input, message, Modal, Radio } from "antd";
import type { EmployeeAddModelData, EmployeeAddModelParams } from "@/types/components";

import PhoneInput from "@/components/common/PhoneInput";
import { employeeAdd } from "@/services";
import { useState } from "react";

const EmployeeAddModel = ({ open, handleClose, handleSuccess }: EmployeeAddModelParams) => {
	const [form] = Form.useForm();
	const [isLoading, setIsLoading] = useState(false);
	const [isContinue, setIsContinue] = useState(false);

	const formFinish = (value: EmployeeAddModelData) => {
		setIsLoading(true);
		employeeAdd({
			id_number: value.id_number,
			name: value.name,
			phone: value.phone.phone,
			sex: value.sex,
			username: value.username,
		})
			.then(() => {
				form.resetFields();
				handleSuccess();
				message.success("添加成功");
				if (!isContinue) {
					handleClose();
				}
			})
			.finally(() => {
				setIsContinue(false);
				setIsLoading(false);
			});
	};

	const onOk = () => {
		form.submit();
	};

	const onContinue = () => {
		setIsContinue(true);
		form.submit();
	};

	return (
		<Modal
			title="添加员工"
			open={open}
			cancelText="取消"
			onCancel={handleClose}
			okButtonProps={{ type: "primary", loading: isLoading }}
			okText="保存"
			onOk={onOk}
			footer={(_, { OkBtn, CancelBtn }) => (
				<>
					<CancelBtn />
					<OkBtn />
					<Button type="primary" loading={isLoading} onClick={onContinue}>
						保存并继续添加
					</Button>
				</>
			)}
		>
			<Form
				form={form}
				name="employeeAdd"
				onFinish={formFinish}
				initialValues={{
					phone: { prefix: "86" },
				}}
				style={{ maxWidth: 600 }}
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
					name="id_number"
					label="身份证号"
					rules={[{ required: true, message: "请输入身份证号!" }]}
				>
					<Input placeholder="请输入身份证号" />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default EmployeeAddModel;
