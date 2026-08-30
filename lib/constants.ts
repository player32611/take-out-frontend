export const CATEGORY_TYPE = {
	DISH: 1,
	SETMEAL: 2,
} as const;

export const CATEGORY_TYPE_OPTIONS = [
	{
		label: "菜品",
		value: CATEGORY_TYPE.DISH,
	},
	{
		label: "套餐",
		value: CATEGORY_TYPE.SETMEAL,
	},
];

export const STATUS = {
	ENABLED: 1,
	DISABLED: 0,
} as const;

export const GENDER = {
	MALE: "男",
	FEMALE: "女",
} as const;

export const DISH_FLAVOR_OPTION = [
	{
		name: "甜味",
		value: ["无糖", "少糖", "半糖", "多糖", "全糖"],
	},
	{
		name: "温度",
		value: ["冷", "常温", "热"],
	},
	{
		name: "忌口",
		value: ["不要葱", "不要蒜", "不要香菜", "不要辣"],
	},
	{
		name: "辣度",
		value: ["不辣", "微辣", "中辣", "特辣"],
	},
] as const;

export const PAGE_SIZE = 10;

export const MESSAGE = {
	DELETE_SUCCESS: "删除成功",
	UPDATE_SUCCESS: "修改成功",
	INSERT_SUCCESS: "添加成功",
	DELIVER_SUCCESS: "派送成功",
	ORDER_CONFIRM_SUCCESS: "接单成功",
	ORDER_COMPLETE_SUCCESS: "完成订单成功",
	ORDER_CANCEL_SUCCESS: "取消成功",
	ORDER_REJECT_SUCCESS: "拒单成功",
} as const;

export const DESCRIPTION = {
	SHOP_STATUS_ENABLE: "当前餐厅处于营业状态，自动接收任何订单，可点击打烊中进入店铺打烊状态",
	SHOP_STATUS_DISABLE:
		"当前餐厅处于打烊状态，仅接收营业时间内的预定订单，可点击营业中手动恢复营业状态",
} as const;

export const ORDER_STATUS = {
	PENDING_PAYMENT: 1,
	TO_BE_CONFIRMED: 2,
	CONFIRMED: 3,
	DELIVERY_IN_PROGRESS: 4,
	COMPLETED: 5,
	CANCELLED: 6,
};

export const PAY_METHOD = {
	WECHAT: 1,
	ALIPAY: 2,
};
