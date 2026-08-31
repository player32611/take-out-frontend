"use client";

import { useEffect, useRef } from "react";
import { Typography } from "antd";
import { init, ECharts } from "echarts";
import { reportTop10 } from "@/services";
import type { ReportChartParams } from "@/types";

const { Title } = Typography;

const ReportTop10Chart = ({ begin, end }: ReportChartParams) => {
	const chartRef = useRef<HTMLDivElement | null>(null);
	const chartInstance = useRef<ECharts | null>(null);

	useEffect(() => {
		chartInstance.current = init(chartRef.current);
		reportTop10({ begin, end }).then(res => {
			chartInstance.current?.setOption({
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
					data: res.data.nameList.split(","),
				},
				yAxis: {
					type: "value",
				},
				series: [
					{
						data: res.data.numberList.split(","),
						type: "bar",
					},
				],
			});

			setTimeout(() => {
				chartInstance.current?.resize();
			}, 0);
		});

		return () => {
			chartInstance.current?.dispose();
			chartInstance.current = null;
		};
	}, [begin, end]);

	return (
		<div style={{ display: "flex", flexDirection: "column", height: "100%", width: "100%" }}>
			<Title level={5}>营业额统计</Title>
			<div ref={chartRef} style={{ flex: 1, width: "100%" }}></div>
		</div>
	);
};

export default ReportTop10Chart;
