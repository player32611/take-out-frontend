"use client";

import { useCallback, useEffect, useState } from "react";
import { Button, Flex, Input, Select, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { DishTableData } from "@/types/components";
import type { SelectProps } from "antd/es/select";

import style from "./dish.module.scss";
import DishTable from "@/components/dish/DishTable";
import DishAddModel from "@/components/dish/DishAddModel";
import { categoryList } from "@/services";

const Dish = () => {
	const [total, setTotal] = useState<number>(0);
	const [tableData, setTableData] = useState<DishTableData[]>([]);
	const [currentSetRecord, setCurrentSetRecord] = useState<DishTableData | null>(null);
	const [addModelOpen, setAddModelOpen] = useState<boolean>(false);
	const [setModelOpen, setSetModelOpen] = useState<boolean>(false);
	const [inputText, setInputText] = useState<string>("");
	const [typeList, setTypeList] = useState<SelectProps["options"]>([]);
	const [selectType, setSelectType] = useState<number | null>(null);
	const [selectStatus, setSelectStatus] = useState();

	const handleRefresh = useCallback(() => {
		categoryList({ type: 1 }).then(res => {
			setTypeList(
				res.data.map(record => ({
					label: record.name,
					value: record.id,
				})),
			);
		});
	}, []);

	const handleSet = useCallback(() => {}, []);

	const handleAdd = useCallback(() => {
		setAddModelOpen(true);
	}, []);

	useEffect(() => {
		handleRefresh();
	}, [handleRefresh]);

	return (
		<div className={style.dish}>
			<Flex className={style.dish_bar} align="center" justify="space-between">
				<Space align="center">
					菜品名称：
					<Input
						placeholder="请填写菜品名称"
						value={inputText}
						onChange={e => setInputText(e.target.value)}
					/>
					菜品分类：
					<Select
						placeholder="请选择"
						style={{ width: 120 }}
						value={selectType}
						options={typeList}
						onChange={type => setSelectType(type)}
						allowClear
					/>
					售卖状态：
					<Select
						placeholder="请选择"
						style={{ width: 120 }}
						value={selectStatus}
						options={[
							{ value: "1", label: "菜品分类" },
							{ value: "2", label: "套餐分类" },
						]}
						onChange={type => setSelectStatus(type)}
						allowClear
					/>
					<Button type="primary" onClick={() => handleRefresh()}>
						查询
					</Button>
				</Space>
				<Space>
					<Button color="danger" variant="link">
						批量删除
					</Button>
					<Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
						新建菜品
					</Button>
				</Space>
			</Flex>
			<DishTable
				data={tableData}
				total={total}
				handleRefresh={handleRefresh}
				handleSet={handleSet}
			/>
			<DishAddModel
				open={addModelOpen}
				handleClose={() => setAddModelOpen(false)}
				handleSuccess={handleRefresh}
			/>
		</div>
	);
};

export default Dish;
