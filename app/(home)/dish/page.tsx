"use client";

import { useCallback, useState } from "react";
import { Button, Flex, Input, Select, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { DishTableData } from "@/types/components";

import style from "./dish.module.scss";
import DishTable from "@/components/dish/DishTable";
import DishAddModel from "@/components/dish/DishAddModel";

const Dish = () => {
	const [total, setTotal] = useState<number>(0);
	const [tableData, setTableData] = useState<DishTableData[]>([]);
	const [currentAddType, setCurrentAddType] = useState<CategoryType>(1);
	const [currentSetRecord, setCurrentSetRecord] = useState<DishTableData | null>(null);
	const [addModelOpen, setAddModelOpen] = useState<boolean>(false);
	const [setModelOpen, setSetModelOpen] = useState<boolean>(false);
	const [inputText, setInputText] = useState<string>("");
	const [selectType, setSelectType] = useState<CategoryType | null>(null);

	const handleRefresh = useCallback(() => {}, []);

	const handleSet = useCallback(() => {}, []);

	const handleAdd = useCallback(() => {
		setAddModelOpen(true);
	}, []);

	return (
		<div className={style.dish}>
			<Flex className={style.dish_bar} align="center" justify="space-between">
				<Space align="center">
					菜品名称：
					<Input placeholder="请填写菜品名称" onChange={e => setInputText(e.target.value)} />
					菜品分类：
					<Select
						placeholder="请选择"
						style={{ width: 120 }}
						value={selectType}
						options={[
							{ value: "1", label: "菜品分类" },
							{ value: "2", label: "套餐分类" },
						]}
						onChange={type => setSelectType(type)}
						allowClear
					/>
					售卖状态：
					<Select
						placeholder="请选择"
						style={{ width: 120 }}
						value={selectType}
						options={[
							{ value: "1", label: "菜品分类" },
							{ value: "2", label: "套餐分类" },
						]}
						onChange={type => setSelectType(type)}
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
