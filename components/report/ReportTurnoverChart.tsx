"use client";

import { useEffect, useRef } from "react";
import { Typography } from "antd";
import { init, dispose } from "echarts";
import { reportTurnover } from "@/services";
import type { ReportChartParams } from "@/types";

const { Title } = Typography;

const ReportTurnoverChart = ({ begin, end }: ReportChartParams) => {
	const chartRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const element = chartRef.current;
		reportTurnover({ begin, end }).then(res => {
			const chart = init(element);
			chart.setOption({
				tooltip: {
					show: true,
				},
				graphic: {
					elements: [
						{
							type: "text",
							left: "center",
							bottom: 10,
							style: {
								text: "营业额(元)",
								fontSize: 14,
							},
						},
					],
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
						data: res.data.turnoverList.split(","),
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
			<Title level={5}>营业额统计</Title>
			<div ref={chartRef} style={{ flex: 1, width: "100%" }}></div>
		</div>
	);
};

export default ReportTurnoverChart;
