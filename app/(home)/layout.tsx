import { Layout } from "antd";

import HomeSider from "@/components/home/HomeSider";
import HomeLayout from "@/components/home/HomeLayout";
import style from "./home.module.scss";

const Home = ({ children }: { children: React.ReactNode }) => {
	return (
		<Layout className={style.home}>
			<HomeSider />
			<HomeLayout>{children}</HomeLayout>
		</Layout>
	);
};

export default Home;
