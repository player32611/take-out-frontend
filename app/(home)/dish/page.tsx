"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Flex, Input, Select, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { categoryList, dishPage } from "@/services";
import { PAGE_SIZE, STATUS } from "@/lib/constants";
import type { DishTableData, DishTableRef } from "@/types/components";
import type { SelectProps } from "antd/es/select";

import style from "./dish.module.scss";
import DishTable from "@/components/dish/DishTable";
import DishAddModel from "@/components/dish/DishAddModel";

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

	const tableRef = useRef<DishTableRef | null>(null);

	const handleRefresh = useCallback(
		(page: number = 1) => {
			dishPage({
				categoryId: selectType || undefined,
				name: inputText,
				page,
				pageSize: PAGE_SIZE,
				status: selectStatus,
			}).then(res => {
				setTableData(
					res.data.records.map(record => ({
						key: record.id,
						name: record.name,
						image: record.image,
						categoryName: record.categoryName,
						price: record.price,
						status: record.status,
						updateTime: record.updateTime,
					})),
				);
				setTotal(res.data.total);
			});
			categoryList({ type: 1 }).then(res => {
				setTypeList(
					res.data.map(record => ({
						label: record.name,
						value: record.id,
					})),
				);
			});
		},
		[selectType, inputText, selectStatus],
	);

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
						allowClear
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
							{ label: "停售", value: STATUS.DISABLED },
							{ label: "启售", value: STATUS.ENABLED },
						]}
						onChange={type => setSelectStatus(type)}
						allowClear
					/>
					<Button type="primary" onClick={() => handleRefresh()}>
						查询
					</Button>
				</Space>
				<Space>
					<Button color="danger" variant="link" onClick={() => tableRef.current?.handleDelete()}>
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
				ref={tableRef}
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
