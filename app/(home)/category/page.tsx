"use client";

import { useCallback, useEffect, useState } from "react";
import { Button, Flex, Input, Select, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { categoryPage } from "@/services";
import { CATEGORY_TYPE_OPTIONS, PAGE_SIZE } from "@/lib/constants";
import type { CategoryTableData } from "@/types/components";
import type { CategoryType } from "@/types/common";

import style from "./category.module.scss";
import CategoryAddModel from "@/components/category/CategoryAddModel";
import CategoryTable from "@/components/category/CategoryTable";
import CategorySetModel from "@/components/category/CategorySetModel";

const Category = () => {
	const [total, setTotal] = useState<number>(0);
	const [tableData, setTableData] = useState<CategoryTableData[]>([]);
	const [currentAddType, setCurrentAddType] = useState<CategoryType>(1);
	const [currentSetRecord, setCurrentSetRecord] = useState<CategoryTableData | null>(null);
	const [addModelOpen, setAddModelOpen] = useState<boolean>(false);
	const [setModelOpen, setSetModelOpen] = useState<boolean>(false);
	const [inputText, setInputText] = useState<string>("");
	const [selectType, setSelectType] = useState<CategoryType | null>(null);

	const handleRefresh = useCallback(
		(page: number = 1) => {
			categoryPage({
				name: inputText || undefined,
				page,
				pageSize: PAGE_SIZE,
				type: selectType || undefined,
			}).then(res => {
				setTotal(res.data.total);
				setTableData(
					res.data.records.map(record => ({
						key: record.id,
						name: record.name,
						type: record.type,
						sort: record.sort,
						status: record.status,
						updateTime: record.updateTime,
					})),
				);
			});
		},
		[inputText, selectType],
	);

	const handleSet = useCallback((record: CategoryTableData) => {
		setCurrentSetRecord(record);
		setSetModelOpen(true);
	}, []);

	const handleAdd = useCallback((type: CategoryType) => {
		setCurrentAddType(type);
		setAddModelOpen(true);
	}, []);

	useEffect(() => {
		handleRefresh();
	}, [handleRefresh]);

	return (
		<div className={style.category}>
			<Flex className={style.category_bar} align="center" justify="space-between">
				<Space align="center">
					分类名称：
					<Input
						placeholder="请填写分类名称"
						value={inputText}
						onChange={e => setInputText(e.target.value)}
						allowClear
					/>
					分类类型：
					<Select
						placeholder="请选择"
						style={{ width: 120 }}
						value={selectType}
						options={CATEGORY_TYPE_OPTIONS}
						onChange={type => setSelectType(type)}
						allowClear
					/>
					<Button type="primary" onClick={() => handleRefresh()}>
						查询
					</Button>
				</Space>
				<Space>
					<Button type="primary" icon={<PlusOutlined />} onClick={() => handleAdd(1)}>
						新增菜品分类
					</Button>
					<Button icon={<PlusOutlined />} onClick={() => handleAdd(2)}>
						新增套餐分类
					</Button>
				</Space>
			</Flex>
			<CategoryTable
				data={tableData}
				total={total}
				handleRefresh={handleRefresh}
				handleSet={handleSet}
			></CategoryTable>
			<CategoryAddModel
				open={addModelOpen}
				type={currentAddType}
				handleClose={() => setAddModelOpen(false)}
				handleSuccess={handleRefresh}
			/>
			<CategorySetModel
				open={setModelOpen}
				record={currentSetRecord}
				handleClose={() => setSetModelOpen(false)}
				handleSuccess={handleRefresh}
			/>
		</div>
	);
};

export default Category;
