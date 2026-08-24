"use client";

import { useCallback, useEffect, useState } from "react";
import { Button, Flex, Input, Select, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { categoryPage } from "@/services";
import { CATEGORY_TYPE_OPTIONS, PAGE_SIZE } from "@/lib/constants";
import type { CategoryTableData } from "@/types/components";
import type { CategoryType } from "@/types/common";

import style from "./category.module.scss";
import CategoryAddModal from "@/components/category/CategoryAddModal";
import CategoryTable from "@/components/category/CategoryTable";
import CategorySetModal from "@/components/category/CategorySetModal";

const Category = () => {
	const [total, setTotal] = useState<number>(0);
	const [tableData, setTableData] = useState<CategoryTableData[]>([]);
	const [currentAddType, setCurrentAddType] = useState<CategoryType>(1);
	const [currentSetRecord, setCurrentSetRecord] = useState<CategoryTableData | null>(null);
	const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
	const [setModalOpen, setSetModalOpen] = useState<boolean>(false);
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
		setSetModalOpen(true);
	}, []);

	const handleAdd = useCallback((type: CategoryType) => {
		setCurrentAddType(type);
		setAddModalOpen(true);
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
			<CategoryAddModal
				open={addModalOpen}
				type={currentAddType}
				handleClose={() => setAddModalOpen(false)}
				handleSuccess={handleRefresh}
			/>
			<CategorySetModal
				open={setModalOpen}
				record={currentSetRecord}
				handleClose={() => setSetModalOpen(false)}
				handleSuccess={handleRefresh}
			/>
		</div>
	);
};

export default Category;
