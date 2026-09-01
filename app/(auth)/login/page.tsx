import LoginForm from "@/components/login/LoginForm";
import style from "./login.module.scss";

const Login = () => {
	return (
		<div className={style.login}>
			<div className={style.login_form_container}>
				<LoginForm />
			</div>
		</div>
	);
};

export default Login;
