"use client";

import { Tabs } from "antd";
import type { TabsProps } from "antd";
import type { ReportTabsParams, ReportTimeRange } from "@/types";

const ReportTabs = ({ tab, handleChange }: ReportTabsParams) => {
	const onChange = (key: ReportTimeRange) => {
		handleChange(key);
	};

	const items: TabsProps["items"] = [
		{
			key: "yesterday",
			label: "昨日",
		},
		{
			key: "7days",
			label: "近7日",
		},
		{
			key: "30days",
			label: "近30日",
		},
		{
			key: "week",
			label: "本周",
		},
		{
			key: "month",
			label: "本月",
		},
	];

	return <Tabs activeKey={tab} items={items} onChange={e => onChange(e as ReportTimeRange)} />;
};

export default ReportTabs;
