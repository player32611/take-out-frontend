"use client";

import { useEffect, useRef, useState } from "react";
import { Flex, Statistic, Typography } from "antd";
import { init, ECharts } from "echarts";
import { reportOrders } from "@/services";
import type { ReportChartParams } from "@/types";

const { Title } = Typography;

const ReportOrdersChart = ({ begin, end }: ReportChartParams) => {
	const [completionRate, setCompletionRate] = useState<number>(0);
	const [totalCount, setTotalCount] = useState<number>(0);
	const [validCount, setValidCount] = useState<number>(0);

	const chartRef = useRef<HTMLDivElement | null>(null);
	const chartInstance = useRef<ECharts | null>(null);

	useEffect(() => {
		if (!chartRef.current) return;
		chartInstance.current = init(chartRef.current);
		reportOrders({ begin, end }).then(res => {
			setCompletionRate(res.data.orderCompletionRate);
			setTotalCount(res.data.totalOrderCount);
			setValidCount(res.data.validOrderCount);
			chartInstance.current?.setOption({
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
						name: "订单总数（个）",
						data: res.data.orderCountList.split(","),
						type: "line",
					},
					{
						name: "有效订单（个）",
						data: res.data.validOrderCountList.split(","),
						type: "line",
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
			<Title level={5}>订单统计</Title>
			<Flex align="center" gap="large">
				<Statistic title="订单完成率" value={completionRate * 100} suffix="%" />
				<div style={{ fontSize: "1.2rem" }}>=</div>
				<Statistic title="有效订单" value={validCount} />
				<div style={{ fontSize: "1.2rem" }}>/</div>
				<Statistic title="订单总数" value={totalCount} />
			</Flex>
			<div ref={chartRef} style={{ flex: 1, width: "100%" }}></div>
		</div>
	);
};

export default ReportOrdersChart;
