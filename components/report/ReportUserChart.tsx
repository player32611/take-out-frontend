"use client";

import { useEffect, useRef } from "react";
import { Typography } from "antd";
import { init, dispose } from "echarts";
import { reportUser } from "@/services";
import type { ReportChartParams } from "@/types";

const { Title } = Typography;

const ReportUserChart = ({ begin, end }: ReportChartParams) => {
	const chartRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const element = chartRef.current;
		reportUser({ begin, end }).then(res => {
			const chart = init(element);
			chart.setOption({
				legend: {
					orient: "horizontal",
					left: "center",
					bottom: 10,
				},
				tooltip: {
					show: true,
				},
				xAxis: {
					type: "category",
					data: res.data.dateList.split(","),
				},
				yAxis: {
					type: "value",
				},
				series: [
					{
						name: "用户总量（个）",
						data: res.data.totalUserList.split(","),
						type: "line",
					},
					{
						name: "新增用户（个）",
						data: res.data.newUserList.split(","),
						type: "line",
					},
				],
			});
		});

		return () => {
			if (!element) return;
			dispose(element);
		};
	}, [begin, end]);

	return (
		<div style={{ display: "flex", flexDirection: "column", height: "100%", width: "100%" }}>
			<Title level={5}>用户统计</Title>
			<div ref={chartRef} style={{ flex: 1, width: "100%" }}></div>
		</div>
	);
};

export default ReportUserChart;
