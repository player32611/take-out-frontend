import { useCallback, useState } from "react";
import { message, Modal, Select, SelectProps } from "antd";
import { MESSAGE } from "@/lib";
import { orderCancel, orderRejection } from "@/services";
import type { OrderReasonModalParams } from "@/types";

const MESSAGE_MAX_LENGTH = 20;

const rejectionOptions: SelectProps["options"] = [
	{
		value: "订单量较多，暂时无法接单",
	},
	{
		value: "菜品已销售完，暂时无法接单",
	},
	{
		value: "商店已打烊，暂时无法接单",
	},
];

const cancelOptions: SelectProps["options"] = [
	{
		value: "订单量较多，暂时无法完成",
	},
	{
		value: "菜品已销售完，暂时无法完成",
	},
	{
		value: "骑手不足，无法配送",
	},
	{
		value: "客户电话取消",
	},
];

const OrderReasonModal = ({
	open,
	id,
	type,
	handleClose,
	handleSuccess,
}: OrderReasonModalParams) => {
	const [reason, setReason] = useState<string>("");

	const handleOk = useCallback(() => {
		if (!id) return;
		if (reason[0].length > MESSAGE_MAX_LENGTH) {
			message.error(`字数过长，请限制在${MESSAGE_MAX_LENGTH}字以内`);
			return;
		}
		if (type === "取消") {
			orderCancel({ id, cancelReason: reason[0] }).then(() => {
				message.success(MESSAGE.ORDER_CANCEL_SUCCESS);
				handleClose();
				handleSuccess();
			});
		} else if (type === "拒单") {
			orderRejection({ id, rejectionReason: reason[0] }).then(() => {
				message.success(MESSAGE.ORDER_REJECT_SUCCESS);
				handleClose();
				handleSuccess();
			});
		}
	}, [id, type, reason, handleClose, handleSuccess]);

	return (
		<Modal
			title={`${type}原因`}
			closable={{ "aria-label": "Custom Close Button" }}
			open={open}
			onCancel={handleClose}
			onOk={handleOk}
			zIndex={2000}
		>
			<Select
				mode="tags"
				placeholder="请选择或输入"
				options={type === "取消" ? cancelOptions : rejectionOptions}
				maxCount={1}
				onChange={e => setReason(e)}
				style={{ width: "100%" }}
			/>
		</Modal>
	);
};

export default OrderReasonModal;
