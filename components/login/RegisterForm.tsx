"use client";

import { Button, Checkbox, Col, Form, Input, Row } from "antd";

import PhoneInput from "../common/PhoneInput";
import { RegisterFormParams } from "@/types/components";

const RegisterForm = ({ handleChangeState }: RegisterFormParams) => {
	const [form] = Form.useForm();

	const onFinish = values => {
		console.log("Received values of form: ", values);
	};

	return (
		<Form
			form={form}
			name="register"
			onFinish={onFinish}
			initialValues={{
				residence: ["zhejiang", "hangzhou", "xihu"],
				phone: { prefix: "86" },
				donation: { currency: "USD" },
			}}
			style={{ maxWidth: 600 }}
			scrollToFirstError
		>
			<Form.Item
				name="nickname"
				label="昵称"
				tooltip="我们将以何种方式称呼您?"
				rules={[{ required: true, message: "请输入昵称!", whitespace: true }]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				name="email"
				label="电子邮箱"
				rules={[
					{
						type: "email",
						message: "The input is not valid E-mail!",
					},
					{
						required: true,
						message: "请输入邮箱!",
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				name="password"
				label="密码"
				rules={[
					{
						required: true,
						message: "请输入密码!",
					},
				]}
				hasFeedback
			>
				<Input.Password />
			</Form.Item>

			<Form.Item
				name="confirm"
				label="确认密码"
				dependencies={["password"]}
				hasFeedback
				rules={[
					{
						required: true,
						message: "请再次确认您的密码!",
					},
					({ getFieldValue }) => ({
						validator(_, value) {
							if (!value || getFieldValue("password") === value) {
								return Promise.resolve();
							}
							return Promise.reject(new Error("两次输入的密码不相同!"));
						},
					}),
				]}
			>
				<Input.Password />
			</Form.Item>

			<Form.Item name="phone" label="手机号" rules={[{ required: true, message: "请输入手机号!" }]}>
				<PhoneInput />
			</Form.Item>

			<Form.Item label="验证码">
				<Row gutter={8}>
					<Col span={12}>
						<Form.Item
							name="captcha"
							noStyle
							rules={[{ required: true, message: "请输入验证码!" }]}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Button>获取验证码</Button>
					</Col>
				</Row>
			</Form.Item>

			<Form.Item
				name="agreement"
				valuePropName="checked"
				rules={[
					{
						validator: (_, value) =>
							value ? Promise.resolve() : Promise.reject(new Error("请阅读并勾选协议!")),
					},
				]}
			>
				<Checkbox>
					我已阅读 <a>用户协议</a>
				</Checkbox>
			</Form.Item>
			<Form.Item>
				<Button type="primary" htmlType="submit" style={{ width: "100%" }}>
					注册
				</Button>
				已有账号? <a onClick={handleChangeState}>立即登录!</a>
			</Form.Item>
		</Form>
	);
};

export default RegisterForm;
