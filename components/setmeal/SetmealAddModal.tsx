import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Form, Input, InputNumber, message, Modal, Select, Space, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { categoryList, dishPage, setmealAdd } from "@/services";
import { fileUpload, CATEGORY_TYPE, MESSAGE, PAGE_SIZE, STATUS } from "@/lib";
import type { SetmealAddModalParams, SetmealModalData, DishPageVO } from "@/types";
import type { SelectProps } from "antd";

const SetmealAddModal = ({ open, handleClose, handleSuccess }: SetmealAddModalParams) => {
	const [form] = Form.useForm();
	const [typeList, setTypeList] = useState<SelectProps["options"]>([]);
	const [dishList, setDishList] = useState<DishPageVO[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const selectDishes = useRef<{ dishId: number; name: string; price: number; copies: number }[]>(
		[],
	);

	const formDishes: { dishId: number | undefined; copies: number }[] = Form.useWatch(
		"setmealDishes",
		form,
	);

	const dishOptions: SelectProps["options"] = dishList.map(record => ({
		value: record.id,
		label: record.name,
		disabled: formDishes && formDishes.some(item => item.dishId === record.id),
	}));

	const formFinish = useCallback(
		(data: SetmealModalData) => {
			setIsLoading(true);
			setmealAdd({
				name: data.name,
				categoryId: data.categoryId,
				price: data.price,
				image: data.image[0].response,
				description: data.description,
				status: STATUS.DISABLED,
				setmealDishes: selectDishes.current,
			})
				.then(() => {
					form.resetFields();
					message.success(MESSAGE.INSERT_SUCCESS);
					handleSuccess();
					handleClose();
				})
				.finally(() => {
					setIsLoading(false);
				});
		},
		[form, handleClose, handleSuccess],
	);

	const handleSearch = useCallback((value: string) => {
		dishPage({ page: 1, pageSize: PAGE_SIZE, name: value }).then(res => {
			setDishList(res.data.records);
		});
	}, []);

	const handleSelect = useCallback(
		(name: number, dishId: number) => {
			const dish = dishList?.find(record => record.id === dishId);
			const copies = formDishes[name].copies;
			if (!dish || !copies) return;
			selectDishes.current[name] = {
				dishId: dish.id,
				name: dish.name,
				price: dish.price,
				copies,
			};
		},
		[dishList, formDishes],
	);

	const handleRemoveDish = useCallback(
		(name: number, dishId: number | undefined, remove: (index: number) => void) => {
			if (dishId === undefined) {
				remove(name);
				return;
			}
			selectDishes.current.splice(name, 1);
			remove(name);
		},
		[],
	);

	const handleChangeCopies = useCallback((name: number, value: number | null) => {
		if (!value) return;
		selectDishes.current[name].copies = value;
	}, []);

	useEffect(() => {
		categoryList({ type: CATEGORY_TYPE.SET_MEAL }).then(res => {
			setTypeList(
				res.data.map(record => ({
					label: record.name,
					value: record.id,
				})),
			);
		});
		dishPage({ page: 1, pageSize: PAGE_SIZE }).then(res => {
			setDishList(res.data.records);
		});
	}, [open, selectDishes, formDishes]);

	return (
		<Modal
			title="新建套餐"
			open={open}
			cancelText="取消"
			onCancel={handleClose}
			okButtonProps={{ type: "primary", loading: isLoading }}
			okText="保存"
			onOk={() => form.submit()}
			width={"60%"}
		>
			<Form
				form={form}
				name="setmealAdd"
				onFinish={formFinish}
				initialValues={{
					phone: { prefix: "86" },
				}}
			>
				<Form.Item
					name="name"
					label="套餐名称"
					rules={[{ required: true, message: "请填写套餐名称!", whitespace: true }]}
				>
					<Input placeholder="请填写套餐名称" />
				</Form.Item>

				<Form.Item
					name="categoryId"
					label="套餐分类"
					rules={[{ required: true, message: "请选择套餐分类!" }]}
				>
					<Select placeholder="请选择套餐分类" options={typeList} />
				</Form.Item>

				<Form.Item
					name="price"
					label="套餐价格"
					rules={[{ required: true, message: "请设置套餐价格!" }]}
				>
					<InputNumber placeholder="请设置套餐价格" min={0} style={{ width: "100%" }} />
				</Form.Item>

				<Form.Item label="套餐菜品" required>
					<Form.List
						name="setmealDishes"
						rules={[
							{
								validator: async (_, value) => {
									if (!value || value.length === 0) {
										message.error("请至少添加一道菜品");
										return Promise.reject(new Error("请至少添加一道菜品"));
									}
								},
							},
						]}
					>
						{(fields, { add, remove }) => (
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									rowGap: 16,
								}}
							>
								{formDishes &&
									fields.map(field => {
										const formValue = formDishes[field.name];
										const currentDish = selectDishes.current[field.name];
										return (
											<Space key={field.key} style={{ width: "100%" }}>
												<Form.Item noStyle name={[field.name, "dishId"]}>
													<Select
														style={{ width: 250 }}
														showSearch={{ optionFilterProp: "label", onSearch: handleSearch }}
														placeholder="请选择菜品"
														options={dishOptions}
														onChange={value => handleSelect(field.name, value)}
													/>
												</Form.Item>
												<Form.Item noStyle name={[field.name, "copies"]} initialValue={1}>
													<InputNumber
														mode="spinner"
														min={1}
														style={{ maxWidth: 130 }}
														disabled={formValue?.dishId === undefined}
														onChange={val => handleChangeCopies(field.name, val)}
													/>
												</Form.Item>
												{formValue?.dishId !== undefined
													? `原价：￥${(currentDish?.price || 0) * formValue.copies}`
													: null}
												<Button
													variant="link"
													color="danger"
													onClick={() => handleRemoveDish(field.name, currentDish?.dishId, remove)}
												>
													删除
												</Button>
											</Space>
										);
									})}

								<Button type="primary" onClick={add} block>
									添加菜品
								</Button>
							</div>
						)}
					</Form.List>
				</Form.Item>

				<Form.Item
					label="套餐图片"
					name="image"
					valuePropName="fileList"
					rules={[{ required: true, message: "请上传套餐图片!" }]}
					getValueFromEvent={e => {
						if (Array.isArray(e)) return e;
						return e?.fileList;
					}}
					extra="支持 JPG、PNG 格式，图片大小不超过 2MB，建议上传200*200或300*300尺寸的图片"
				>
					<Upload name="file" listType="picture-card" maxCount={1} customRequest={fileUpload}>
						<Space orientation="vertical">
							<UploadOutlined />
							上传图片
						</Space>
					</Upload>
				</Form.Item>

				<Form.Item name="description" label="套餐描述">
					<Input.TextArea showCount maxLength={200} placeholder="套餐描述，最长200字" />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default SetmealAddModal;
