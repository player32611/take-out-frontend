"use client";

import { useCallback, useState } from "react";

import LoginForm from "@/components/login/LoginForm";
import RegisterForm from "@/components/login/RegisterForm";
import style from "./login.module.scss";

const Login = () => {
	const [formState, setFormState] = useState<"login" | "register">("login");

	const showLoginForm = useCallback(() => {
		setFormState("login");
	}, []);

	const showRegister = useCallback(() => {
		setFormState("register");
	}, []);

	return (
		<div className={style.login}>
			<div className={style.login_form_container}>
				{formState === "login" ? (
					<LoginForm handleChangeState={showRegister} />
				) : (
					<RegisterForm handleChangeState={showLoginForm} />
				)}
			</div>
		</div>
	);
};

export default Login;
