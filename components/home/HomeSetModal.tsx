import { Card, Flex, message, Modal, Radio } from "antd";
import { useCallback, useEffect, useState } from "react";
import { DESCRIPTION, MESSAGE, STATUS } from "@/lib";
import { shopSetStatus } from "@/services";
import type { HomeSetModalParams, Status } from "@/types";

const HomeSetModal = ({ open, status, handleClose, handleSuccess }: HomeSetModalParams) => {
	const [selectStatus, setSelectStatus] = useState<Status | null>(status);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleSet = useCallback(() => {
		if (selectStatus === null || selectStatus === status) return;
		setIsLoading(true);
		shopSetStatus({ status: selectStatus })
			.then(() => {
				message.success(MESSAGE.UPDATE_SUCCESS);
				handleClose();
				handleSuccess();
			})
			.finally(() => setIsLoading(false));
	}, [status, handleClose, handleSuccess, selectStatus]);

	useEffect(() => {
		if (open) setSelectStatus(status);
	}, [open, status]);

	return (
		<Modal
			title="营业状态设置"
			open={open}
			onCancel={handleClose}
			onOk={handleSet}
			cancelText="取消"
			okText="确定"
			okButtonProps={{ loading: isLoading }}
		>
			<Flex vertical gap="medium">
				<Card hoverable onClick={() => setSelectStatus(STATUS.ENABLED)}>
					<Radio
						checked={selectStatus === STATUS.ENABLED}
						style={{ marginBottom: 10, fontWeight: "bold" }}
						defaultChecked={status === STATUS.ENABLED}
					>
						营业中
					</Radio>
					<div>{DESCRIPTION.SHOP_STATUS_ENABLE}</div>
				</Card>

				<Card hoverable onClick={() => setSelectStatus(STATUS.DISABLED)}>
					<Radio
						checked={selectStatus === STATUS.DISABLED}
						style={{ marginBottom: 10, fontWeight: "bold" }}
						defaultChecked={status === STATUS.DISABLED}
					>
						打烊中
					</Radio>
					<div>{DESCRIPTION.SHOP_STATUS_DISABLE}</div>
				</Card>
			</Flex>
		</Modal>
	);
};

export default HomeSetModal;
