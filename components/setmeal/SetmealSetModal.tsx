import { useCallback, useEffect, useState, useRef } from "react";
import { Button, Form, Input, InputNumber, message, Modal, Select, Space, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { categoryList, dishPage, setmealId, setmealUpdate } from "@/services";
import { fileUpload, CATEGORY_TYPE, MESSAGE, STATUS, PAGE_SIZE } from "@/lib";
import type { DishPageVO, SetmealModalData, SetmealSetModalParams } from "@/types";
import type { SelectProps } from "antd";

const SetmealSetModal = ({ open, id, handleSuccess, handleClose }: SetmealSetModalParams) => {
	const [form] = Form.useForm<SetmealModalData>();
	const [typeList, setTypeList] = useState<SelectProps["options"]>([]);
	const [dishList, setDishList] = useState<DishPageVO[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const selectDishMap = useRef<
		Map<number, { dishId: number; name: string; price: number; copies: number }>
	>(new Map());

	const dishOptions: SelectProps["options"] = dishList.map(record => ({
		value: record.id,
		label: record.name,
	}));

	const setmealDishes: { dishId: number; copies: number }[] = Form.useWatch("setmealDishes", form);

	const formFinish = useCallback(
		(data: SetmealModalData) => {
			if (!id) return;
			setIsLoading(true);
			setmealUpdate({
				id: id,
				name: data.name,
				categoryId: data.categoryId,
				price: data.price,
				image: data.image[0].response,
				description: data.description,
				status: STATUS.DISABLED,
				setmealDishes: [...selectDishMap.current].map(([idx, value]) => ({
					dishId: value.dishId,
					name: value.name,
					price: value.price,
					copies: data.setmealDishes[idx].copies,
				})),
			})
				.then(() => {
					form.resetFields();
					message.success(MESSAGE.UPDATE_SUCCESS);
					handleSuccess();
					handleClose();
				})
				.finally(() => {
					setIsLoading(false);
				});
		},
		[id, form, handleClose, handleSuccess],
	);

	const handleSearch = useCallback((value: string) => {
		dishPage({ page: 1, pageSize: PAGE_SIZE, name: value }).then(res => {
			setDishList(res.data.records);
		});
	}, []);

	const handleSelect = useCallback(
		(name: number, dishId: number) => {
			const dish = dishList?.find(record => record.id === dishId);
			const copies = setmealDishes[name].copies;
			if (!dish || !copies) return;
			selectDishMap.current.set(name, {
				dishId: dish.id,
				name: dish.name,
				price: dish.price,
				copies,
			});
		},
		[dishList, setmealDishes],
	);

	const handleChangeCopies = useCallback((name: number, value: number | null) => {
		const record = selectDishMap.current.get(name);
		if (!record || !value) return;
		record.copies = value;
	}, []);

	useEffect(() => {
		categoryList({ type: CATEGORY_TYPE.SETMEAL }).then(res => {
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
		if (id) {
			setmealId({ id }).then(res => {
				form.setFieldsValue({
					name: res.data.name,
					categoryId: res.data.categoryId,
					price: res.data.price,
					setmealDishes: res.data.setmealDishes.map(record => ({
						dishId: record.dishId,
						copies: record.copies,
					})),
					image: [
						{
							uid: "-1",
							name: res.data.name,
							status: "done",
							url: res.data.image,
						},
					],
					description: res.data.description,
				});
				res.data.setmealDishes.forEach((record, index) => {
					selectDishMap.current.set(index, {
						dishId: record.dishId,
						name: record.name,
						price: record.price,
						copies: record.copies,
					});
				});
			});
		}
	}, [open, id, form]);

	return (
		<Modal
			title="修改套餐"
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
				name="setmealSet"
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
								{setmealDishes &&
									fields.map(field => {
										const item = setmealDishes[field.name];
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
														disabled={item?.dishId === undefined}
														onChange={val => handleChangeCopies(field.name, val)}
													/>
												</Form.Item>
												{item?.dishId !== undefined
													? `原价：￥${(selectDishMap.current.get(field.name)?.price || 0) * (selectDishMap.current.get(field.name)?.copies || 0)}`
													: null}
												<Button variant="link" color="danger" onClick={() => remove(field.name)}>
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

export default SetmealSetModal;
