import { ConfigProvider as AntdConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";

const ConfigProvider = ({ children }: React.PropsWithChildren) => {
	return <AntdConfigProvider locale={zhCN}>{children}</AntdConfigProvider>;
};
export default ConfigProvider;
