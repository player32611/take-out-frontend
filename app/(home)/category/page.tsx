"use client";

import { Button, Flex, Input, Select, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import style from "./category.module.scss";
import CategoryTable from "@/components/category/CategoryTable";

const Category = () => {
	const handleSearch = () => {};

	return (
		<div className={style.category}>
			<Flex className={style.category_bar} align="center" justify="space-between">
				<Space align="center">
					分类名称：
					<Input placeholder="请填写分类名称" />
					分类类型：
					<Select
						placeholder="请选择"
						style={{ width: 120 }}
						options={[
							{ value: "jack", label: "Jack" },
							{ value: "lucy", label: "Lucy" },
							{ value: "Yiminghe", label: "yiminghe" },
							{ value: "disabled", label: "Disabled" },
						]}
					/>
					<Button type="primary">查询</Button>
				</Space>
				<Space>
					<Button type="primary" icon={<PlusOutlined />}>
						新增菜品分类
					</Button>
					<Button icon={<PlusOutlined />}>新增套餐分类</Button>
				</Space>
			</Flex>
			<CategoryTable></CategoryTable>
		</div>
	);
};

export default Category;
