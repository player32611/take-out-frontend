"use client";

import { useCallback, useState } from "react";
import { Button, Col, Flex, Row } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { reportExport } from "@/services";
import type { ReportTimeRange } from "@/types";

import ReportTabs from "@/components/report/ReportTabs";
import ReportTurnoverChart from "@/components/report/ReportTurnoverChart";
import ReportUserChart from "@/components/report/ReportUserChart";
import ReportOrdersChart from "@/components/report/ReportOrdersChart";
import ReportTop10Chart from "@/components/report/ReportTop10Chart";

import style from "./report.module.scss";

const Report = () => {
	const [selectTab, setSelectTab] = useState<ReportTimeRange>("yesterday");
	const [beginTime, setBeginTime] = useState<string>(
		dayjs().subtract(1, "day").format("YYYY-MM-DD"),
	);
	const [endTime, setEndTime] = useState<string>(dayjs().subtract(1, "day").format("YYYY-MM-DD"));

	const handleChangeTab = useCallback((tab: ReportTimeRange) => {
		setSelectTab(tab);
		if (tab === "yesterday") {
			setBeginTime(dayjs().subtract(1, "day").format("YYYY-MM-DD"));
			setEndTime(dayjs().subtract(1, "day").format("YYYY-MM-DD"));
		} else if (tab === "7days") {
			setBeginTime(dayjs().subtract(7, "day").format("YYYY-MM-DD"));
			setEndTime(dayjs().subtract(1, "day").format("YYYY-MM-DD"));
		} else if (tab === "30days") {
			setBeginTime(dayjs().subtract(30, "day").format("YYYY-MM-DD"));
			setEndTime(dayjs().subtract(1, "day").format("YYYY-MM-DD"));
		} else if (tab === "week") {
			setBeginTime(dayjs().startOf("week").format("YYYY-MM-DD"));
			setEndTime(dayjs().endOf("week").format("YYYY-MM-DD"));
		} else if (tab === "month") {
			setBeginTime(dayjs().startOf("month").format("YYYY-MM-DD"));
			setEndTime(dayjs().endOf("month").format("YYYY-MM-DD"));
		}
	}, []);

	const handleExport = useCallback(() => {
		reportExport().then(res => {
			const blob = new Blob([res.data], {
				type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			});

			console.log(res.data.text());
			const url = window.URL.createObjectURL(blob);

			const link = document.createElement("a");

			link.href = url;

			link.download = "报表.xlsx";

			link.click();

			window.URL.revokeObjectURL(url);
		});
	}, []);

	return (
		<Flex className={style.report} vertical>
			<Flex align="center" justify="space-between">
				<ReportTabs tab={selectTab} handleChange={handleChangeTab} />
				<Button icon={<UploadOutlined />} onClick={handleExport}>
					数据导出
				</Button>
			</Flex>
			<Row style={{ flex: 1 }}>
				<Col span={12}>
					<ReportTurnoverChart begin={beginTime} end={endTime} />
				</Col>
				<Col span={12}>
					<ReportUserChart begin={beginTime} end={endTime} />
				</Col>
			</Row>
			<Row style={{ flex: 1 }}>
				<Col span={12}>
					<ReportOrdersChart begin={beginTime} end={endTime} />
				</Col>
				<Col span={12}>
					<ReportTop10Chart begin={beginTime} end={endTime} />
				</Col>
			</Row>
		</Flex>
	);
};

export default Report;
