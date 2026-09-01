"use client";

import { Col, Descriptions, Divider, Row, Modal, message } from "antd";
import { useCallback, useEffect, useState, useImperativeHandle } from "react";
import { orderConfirm, orderComplete, orderDetails, orderDelivery } from "@/services";
import { ORDER_STATUS, PAY_METHOD, MESSAGE } from "@/lib";
import type { OrderDetailsData, OrderDetailsModalParams } from "@/types";

import style from "./orderDetailsModal.module.scss";

const OrderDetailsModal = ({
	open,
	id,
	handleClose,
	handleReason,
	handleRefresh,
	ref,
}: OrderDetailsModalParams) => {
	const [orderData, setOrderData] = useState<OrderDetailsData | null>(null);

	const renewData = useCallback(() => {
		if (!id) return;
		orderDetails({ id }).then(res => {
			setOrderData(res.data);
		});
	}, [id]);

	const handleOk = useCallback(() => {
		if (!orderData) return;

		if (orderData.status === ORDER_STATUS.PENDING_PAYMENT) handleReason(orderData.id, "取消");
		else if (orderData.status === ORDER_STATUS.TO_BE_CONFIRMED) {
			orderConfirm({ id: orderData.id }).then(() => {
				message.success(MESSAGE.ORDER_CONFIRM_SUCCESS);
				handleRefresh();
				renewData();
			});
		} else if (orderData.status === ORDER_STATUS.CONFIRMED) {
			orderDelivery({ id: orderData.id }).then(() => {
				message.success(MESSAGE.DELIVER_SUCCESS);
				handleRefresh();
				renewData();
			});
		} else if (orderData.status === ORDER_STATUS.DELIVERY_IN_PROGRESS) {
			orderComplete({ id: orderData.id }).then(() => {
				message.success(MESSAGE.ORDER_COMPLETE_SUCCESS);
				handleRefresh();
				renewData();
			});
		} else if (orderData.status === ORDER_STATUS.COMPLETED) {
			message.error("退单功能暂不支持");
		}
	}, [orderData, renewData, handleReason, handleRefresh]);

	const items = [
		{
			key: "number",
			label: "订单号",
			children: orderData?.number,
		},
		{
			key: "orderTime",
			label: "下单时间",
			children: orderData?.orderTime,
		},
		{
			key: "status",
			label: "订单状态",
			children:
				orderData?.status === ORDER_STATUS.PENDING_PAYMENT
					? "待付款"
					: orderData?.status === ORDER_STATUS.TO_BE_CONFIRMED
						? "待接单"
						: orderData?.status === ORDER_STATUS.CONFIRMED
							? "待派送"
							: orderData?.status === ORDER_STATUS.DELIVERY_IN_PROGRESS
								? "派送中"
								: orderData?.status === ORDER_STATUS.COMPLETED
									? "已完成"
									: orderData?.status === ORDER_STATUS.CANCELLED
										? "已取消"
										: "未知",
		},
		{
			key: "amount",
			label: "订单金额",
			children: orderData?.amount,
		},
		orderData?.status === ORDER_STATUS.CONFIRMED ||
		orderData?.status === ORDER_STATUS.DELIVERY_IN_PROGRESS ||
		orderData?.status === ORDER_STATUS.COMPLETED
			? {
					key: "checkoutTime",
					label: "支付时间",
					children: orderData.checkoutTime,
				}
			: null,
		orderData?.status === ORDER_STATUS.CONFIRMED ||
		orderData?.status === ORDER_STATUS.DELIVERY_IN_PROGRESS ||
		orderData?.status === ORDER_STATUS.COMPLETED
			? {
					key: "payMethod",
					label: "支付渠道",
					children:
						orderData.payMethod === PAY_METHOD.WECHAT
							? "微信"
							: orderData.payMethod === PAY_METHOD.ALIPAY
								? "支付宝"
								: "未知",
				}
			: null,
		orderData?.status === ORDER_STATUS.TO_BE_CONFIRMED ||
		orderData?.status === ORDER_STATUS.CONFIRMED ||
		orderData?.status === ORDER_STATUS.DELIVERY_IN_PROGRESS
			? {
					key: "estimatedDeliveryTime",
					label: "预计送达时间",
					children: orderData.estimatedDeliveryTime,
					span: 2,
				}
			: null,
		orderData?.status === ORDER_STATUS.COMPLETED
			? {
					key: "estimatedDeliveryTime",
					label: "送达时间",
					children: orderData.deliveryTime,
					span: 2,
				}
			: null,
		{
			key: "userName",
			label: "用户名",
			children: orderData?.userName || "未知",
		},
		{
			key: "phone",
			label: "手机号",
			children: orderData?.phone.replace(/^(.{3}).*(.{4})$/, "$1****$2"),
		},
		{
			key: "address",
			label: "地址",
			children: orderData?.address,
			span: 2,
		},
		orderData?.status !== ORDER_STATUS.CANCELLED
			? {
					key: "remark",
					label: "备注",
					children: orderData?.remark,
					span: 2,
				}
			: null,
		orderData?.status === ORDER_STATUS.CANCELLED
			? {
					key: "reason",
					label: "取消原因",
					children: orderData.cancelReason || orderData.rejectionReason,
					span: 2,
				}
			: null,
		{
			key: "dish",
			label: "菜品",
			span: 2,
		},
	].filter(item => item !== null);

	useEffect(() => {
		renewData();
	}, [renewData]);

	useImperativeHandle(ref, () => ({
		renewData,
	}));

	return (
		<Modal
			title="订单信息"
			closable={{ "aria-label": "Custom Close Button" }}
			open={open}
			onCancel={handleClose}
			cancelText="返回"
			okText={
				orderData?.status === ORDER_STATUS.PENDING_PAYMENT
					? "取消订单"
					: orderData?.status === ORDER_STATUS.TO_BE_CONFIRMED
						? "接单"
						: orderData?.status === ORDER_STATUS.CONFIRMED
							? "派送"
							: orderData?.status === ORDER_STATUS.DELIVERY_IN_PROGRESS
								? "完成"
								: orderData?.status === ORDER_STATUS.COMPLETED
									? "退单"
									: "未知"
			}
			onOk={handleOk}
			footer={(_, { OkBtn, CancelBtn }) => (
				<>
					<CancelBtn />
					{orderData?.status === ORDER_STATUS.CANCELLED ? <></> : <OkBtn />}
				</>
			)}
		>
			<Descriptions items={items} column={2} colon={false} style={{ marginBottom: 10 }} />
			{orderData?.orderDetailList.map(dish => (
				<Row key={dish.id}>
					<Col className={style.col} span={6}>
						{dish.name}
					</Col>
					<Col className={style.col} span={6}>
						{dish.dishFlavor}
					</Col>
					<Col className={style.col} span={6}>
						×{dish.number}
					</Col>
					<Col className={style.col} span={6}>
						￥{dish.amount * dish.number}
					</Col>
				</Row>
			))}

			<Divider />
			<Row>
				<Col className={style.col} span={12}>
					派送费
				</Col>
				<Col className={style.col} span={6}></Col>
				<Col className={style.col} span={6}>
					￥{orderData?.packAmount || 0}
				</Col>
			</Row>
			<Row>
				<Col className={style.col} span={12}>
					打包费
				</Col>
				<Col className={style.col} span={6}></Col>
				<Col className={style.col} span={6}>
					￥{orderData?.packAmount || 0}
				</Col>
			</Row>
			<Row>
				<Col className={style.col} span={12}>
					合计
				</Col>
				<Col className={style.col} span={6}></Col>
				<Col className={style.col} span={6}>
					￥{orderData?.amount || 0}
				</Col>
			</Row>
		</Modal>
	);
};

export default OrderDetailsModal;
