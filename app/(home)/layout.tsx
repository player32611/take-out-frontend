import { Layout } from "antd";

import HomeLayout from "@/components/home/HomeLayout";
import style from "./home.module.scss";

const Home = ({ children }: { children: React.ReactNode }) => {
	return (
		<Layout className={style.home}>
			<HomeLayout>{children}</HomeLayout>
		</Layout>
	);
};

export default Home;
