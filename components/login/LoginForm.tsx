"use client";

import { employeeLogin } from "@/services";
import { LoginFormData } from "@/types/components";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Checkbox, Flex, Form, Input } from "antd";
import { useRouter } from "next/navigation";

const LoginForm = () => {
	const router = useRouter();
	const [form] = Form.useForm();

	const onFinish = async (values: LoginFormData) => {
		const result = await employeeLogin({ username: values.username, password: values.password });

		if (result.data) {
			router.push("/");
		} else {
			form.setFields([{ name: "password", errors: ["用户名或密码错误!"] }]);
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
				或者 <a href="">立即注册!</a>
			</Form.Item>
		</Form>
	);
};

export default LoginForm;
