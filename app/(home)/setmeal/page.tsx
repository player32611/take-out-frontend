"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Flex, Input, Select, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { categoryList, dishPage } from "@/services";
import { CATEGORY_TYPE, PAGE_SIZE, STATUS } from "@/lib/constants";
import type { DishTableData, DishTableRef } from "@/types";
import type { SelectProps } from "antd/es/select";

import style from "./setmeal.module.scss";
// import DishTable from "@/components/dish/DishTable";
import SetmealAddModal from "@/components/setmeal/SetmealAddModal";
// import DishSetModal from "@/components/dish/DishSetModal";

const Setmeal = () => {
	const [total, setTotal] = useState<number>(0);
	// const [tableData, setTableData] = useState<DishTableData[]>([]);
	const [currentSetId, setCurrentSetId] = useState<number | null>(null);
	const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
	const [setModalOpen, setSetModalOpen] = useState<boolean>(false);
	const [inputText, setInputText] = useState<string>("");
	const [typeList, setTypeList] = useState<SelectProps["options"]>([]);
	const [selectType, setSelectType] = useState<number | null>(null);
	const [selectStatus, setSelectStatus] = useState();

	const tableRef = useRef<DishTableRef | null>(null);

	const handleRefresh = useCallback(
		(page: number = 1) => {
			// dishPage({
			// 	categoryId: selectType || undefined,
			// 	name: inputText,
			// 	page,
			// 	pageSize: PAGE_SIZE,
			// 	status: selectStatus,
			// }).then(res => {
			// 	setTableData(
			// 		res.data.records.map(record => ({
			// 			key: record.id,
			// 			name: record.name,
			// 			image: record.image,
			// 			categoryName: record.categoryName,
			// 			price: record.price,
			// 			status: record.status,
			// 			updateTime: record.updateTime,
			// 		})),
			// 	);
			// 	setTotal(res.data.total);
			// });
			categoryList({ type: CATEGORY_TYPE.SET_MEAL }).then(res => {
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

	const handleSet = useCallback((id: number) => {
		setCurrentSetId(id);
		setSetModalOpen(true);
	}, []);

	const handleAdd = useCallback(() => {
		setAddModalOpen(true);
	}, []);

	useEffect(() => {
		handleRefresh();
	}, [handleRefresh]);

	return (
		<div className={style.setmeal}>
			<Flex className={style.setmeal_bar} align="center" justify="space-between">
				<Space align="center">
					套餐名称：
					<Input
						placeholder="请填写套餐名称"
						value={inputText}
						onChange={e => setInputText(e.target.value)}
						allowClear
					/>
					套餐分类：
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
						新建套餐
					</Button>
				</Space>
			</Flex>
			{/* <DishTable
				data={tableData}
				total={total}
				handleRefresh={handleRefresh}
				handleSet={handleSet}
				ref={tableRef}
			/> */}
			<SetmealAddModal
				open={addModalOpen}
				handleClose={() => setAddModalOpen(false)}
				handleSuccess={handleRefresh}
			/>
			{/* <DishSetModal
				open={setModalOpen}
				id={currentSetId}
				handleClose={() => setSetModalOpen(false)}
				handleSuccess={handleRefresh}
			/>  */}
		</div>
	);
};

export default Setmeal;
