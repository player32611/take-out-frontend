export const CATEGORY_TYPE = {
	DISH: 1,
	SET_MEAL: 2,
} as const;

export const CATEGORY_TYPE_OPTIONS = [
	{
		label: "菜品",
		value: CATEGORY_TYPE.DISH,
	},
	{
		label: "套餐",
		value: CATEGORY_TYPE.SET_MEAL,
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

export const MESSAGE_DELETE_SUCCESS = "删除成功";
