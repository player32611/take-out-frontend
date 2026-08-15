"use client";

import { employeeLogin } from "@/services";
import type { LoginFormData, LoginFormParams } from "@/types/components";
import { setToken } from "@/utils/auth";
import { useRouter } from "next/navigation";

import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Checkbox, Flex, Form, Input } from "antd";

const LoginForm = ({ handleChangeState }: LoginFormParams) => {
	const router = useRouter();
	const [form] = Form.useForm();

	const onFinish = async (values: LoginFormData) => {
		const response = await employeeLogin({ username: values.username, password: values.password });
		const result = response.data;
		console.log(result.data);
		if (result.data) {
			setToken(result.data.token);
			router.push("/");
		} else {
			form.setFields([{ name: "password", errors: [result.msg] }]);
		}
	};

	return (
		<Form
			name="login"
			form={form}
			initialValues={{ remember: true }}
			style={{ maxWidth: 360 }}
			onFinish={onFinish}
		>
			<Form.Item name="username" rules={[{ required: true, message: "请输入用户名!" }]}>
				<Input prefix={<UserOutlined />} placeholder="用户名" />
			</Form.Item>
			<Form.Item name="password" rules={[{ required: true, message: "请输入密码!" }]}>
				<Input prefix={<LockOutlined />} type="password" placeholder="密码" />
			</Form.Item>
			<Form.Item>
				<Flex justify="space-between" align="center">
					<Form.Item name="remember" valuePropName="checked" noStyle>
						<Checkbox>记住我</Checkbox>
					</Form.Item>
					<a href="">忘记密码？</a>
				</Flex>
			</Form.Item>

			<Form.Item>
				<Button block type="primary" htmlType="submit">
					登录
				</Button>
				或者 <a onClick={handleChangeState}>立即注册!</a>
			</Form.Item>
		</Form>
	);
};

export default LoginForm;
