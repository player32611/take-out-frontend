"use client";

import { useRouter } from "next/navigation";
import { employeeLogin } from "@/services";
import { setName, setToken } from "@/lib";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Checkbox, Flex, Form, Input } from "antd";
import type { LoginFormData } from "@/types";

const LoginForm = () => {
	const router = useRouter();
	const [form] = Form.useForm();

	const onFinish = (values: LoginFormData) => {
		employeeLogin({ username: values.username, password: values.password }).then(res => {
			if (res.data) {
				setToken(res.data.token);
				setName(res.data.username);
				router.push("/");
			} else form.setFields([{ name: "password", errors: [res.msg] }]);
		});
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
				</Flex>
			</Form.Item>

			<Form.Item>
				<Button block type="primary" htmlType="submit">
					登录
				</Button>
			</Form.Item>
		</Form>
	);
};

export default LoginForm;
