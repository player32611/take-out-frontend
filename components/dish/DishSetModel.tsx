import { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, message, Modal, Select, Space, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { categoryList, commonUpload, dishId } from "@/services";
import { DISH_FLAVOR_OPTION, STATUS } from "@/lib/constants";
import type { DishModelData, DishSetModelParams } from "@/types/components";
import type { SelectProps, UploadFile, UploadProps } from "antd";

const DishSetModel = ({ open, id, handleSuccess, handleClose }: DishSetModelParams) => {
	const [form] = Form.useForm();
	const [typeList, setTypeList] = useState<SelectProps["options"]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const dishFlavor: { name: string; value: string[] }[] = Form.useWatch("dishFlavor", form);

	const formFinish = (data: DishModelData) => {
		console.log(data);
		// setIsLoading(true);
		// dishAdd({
		// 	name: data.name,
		// 	categoryId: data.categoryId,
		// 	price: data.price,
		// 	image: data.image[0].response,
		// 	description: data.description,
		// 	status: STATUS.DISABLED,
		// 	flavors: data.dishFlavor.map(val => ({ name: val.name, value: JSON.stringify(val.value) })),
		// })
		// 	.then(() => {
		// 		form.resetFields();
		// 		message.success("添加成功");
		// 		handleSuccess();
		// 		handleClose();
		// 	})
		// 	.finally(() => {
		// 		setIsLoading(false);
		// 	});
	};

	const handleUpload: UploadProps["customRequest"] = ({ file, onSuccess, onError }) => {
		if (!(file instanceof File)) {
			message.error("文件类型错误");
			onError?.(new Error("文件类型错误"));
			return;
		}

		commonUpload({ file })
			.then(res => {
				onSuccess?.(res.data);
			})
			.catch(err => {
				onError?.(err);
			});
	};

	useEffect(() => {
		categoryList({ type: 1 }).then(res => {
			setTypeList(
				res.data.map(record => ({
					label: record.name,
					value: record.id,
				})),
			);
		});
		if (id) {
			dishId({ id: id }).then(res => {
				form.setFieldsValue({
					name: res.data.name,
					categoryId: res.data.categoryId,
					price: res.data.price,
					dishFlavor: res.data.flavors.map(record => ({
						name: record.name,
						value: JSON.parse(record.value),
					})),
					image: [
						{
							uid: "-1",
							name: res.data.name,
							status: "done",
							url: res.data.image,
						} satisfies UploadFile,
					],
					description: res.data.description,
				});
			});
		}
	}, [open, id, form]);

	return (
		<Modal
			title="修改菜品"
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
				name="employeeAdd"
				onFinish={formFinish}
				initialValues={{
					phone: { prefix: "86" },
				}}
			>
				<Form.Item
					name="name"
					label="菜品名称"
					rules={[{ required: true, message: "请填写菜品名称!", whitespace: true }]}
				>
					<Input placeholder="请填写菜品名称" />
				</Form.Item>

				<Form.Item
					name="categoryId"
					label="菜品分类"
					rules={[{ required: true, message: "请选择菜品分类!" }]}
				>
					<Select placeholder="请选择菜品分类" options={typeList} />
				</Form.Item>

				<Form.Item
					name="price"
					label="菜品价格"
					rules={[{ required: true, message: "请设置菜品价格!" }]}
				>
					<InputNumber placeholder="请设置菜品价格" min={0} style={{ width: "100%" }} />
				</Form.Item>

				<Form.Item label="口味做法配置">
					<Form.List name="dishFlavor">
						{(fields, { add, remove }) => (
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									rowGap: 16,
								}}
							>
								{fields.map(field => {
									const flavorName = form.getFieldValue(["dishFlavor", field.name, "name"]);
									const currentOption = DISH_FLAVOR_OPTION.find(item => item.name === flavorName);
									const selected =
										dishFlavor
											?.filter((_, index) => index !== field.name)
											?.map(item => item?.name)
											?.filter(Boolean) ?? [];

									return (
										<Space key={field.key} style={{ width: "100%" }}>
											<Form.Item noStyle name={[field.name, "name"]}>
												<Select
													style={{ width: "5rem" }}
													placeholder="请选择口味"
													options={DISH_FLAVOR_OPTION.map(item => ({
														value: item.name,
														label: item.name,
														disabled: selected.includes(item.name),
													}))}
												/>
											</Form.Item>

											<Form.Item noStyle name={[field.name, "value"]}>
												<Select
													style={{ minWidth: 200 }}
													mode="tags"
													placeholder="请选择或输入"
													options={currentOption?.value.map(item => ({
														value: item,
														label: item,
													}))}
												/>
											</Form.Item>

											<Button variant="link" color="danger" onClick={() => remove(field.name)}>
												删除
											</Button>
										</Space>
									);
								})}

								{fields.length < 4 && (
									<Button type="primary" onClick={() => add()} block>
										添加口味
									</Button>
								)}
							</div>
						)}
					</Form.List>
				</Form.Item>

				<Form.Item
					label="菜品图片"
					name="image"
					valuePropName="fileList"
					rules={[{ required: true, message: "请上传菜品图片!" }]}
					getValueFromEvent={e => {
						if (Array.isArray(e)) return e;
						return e?.fileList;
					}}
					extra="支持 JPG、PNG 格式，图片大小不超过 2MB，建议上传200*200或300*300尺寸的图片"
				>
					<Upload name="file" listType="picture-card" maxCount={1} customRequest={handleUpload}>
						<Space orientation="vertical">
							<UploadOutlined />
							上传图片
						</Space>
					</Upload>
				</Form.Item>

				<Form.Item name="description" label="菜品描述">
					<Input.TextArea showCount maxLength={200} placeholder="菜品描述，最长200字" />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default DishSetModel;
