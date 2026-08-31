import {
	CATEGORY_TYPE,
	STATUS,
	GENDER,
	ORDER_STATUS,
	PAY_METHOD,
	REMINDER_STATUS,
} from "@/lib/constants";

export interface Category {
	id: number;
	type: CategoryType;
	name: string;
	sort: number;
	status: Status;
	createTime: string;
	updateTime: string;
	createUser: number;
	updateUser: number;
}

export interface Dish {
	id: number;
	name: string;
	categoryId: number;
	price: number;
	image: string;
	description: string;
	status: Status;
	createTime: string;
	updateTime: string;
	createUser: number;
	updateUser: number;
}

export interface DishFlavor {
	id: number;
	dishId: number;
	name: string;
	value: string;
}

export interface Employee {
	id: number;
	username: string;
	name: string;
	password: string;
	phone: string;
	sex: string;
	idNumber: string;
	status: Status;
	createTime: string;
	updateTime: string;
	createUser: number;
	updateUser: number;
}

export interface Orders {
	id: number;
	number: string;
	status: OrderStatus;
	userId: number;
	addressBookId: number;
	orderTime: string;
	checkoutTime: string;
	payMethod: number;
	payStatus: number;
	amount: number;
	remark: string;
	userName: string | null;
	phone: string;
	address: string;
	consignee: string;
	cancelReason: string | null;
	rejectionReason: string | null;
	cancelTime: string | null;
	estimatedDeliveryTime: string;
	deliveryStatus: number;
	deliveryTime: string | null;
	packAmount: number;
	tablewareNumber: number;
	tablewareStatus: number;
}

export interface OrderDetail {
	id: number;
	name: string;
	orderId: number;
	dishId: number;
	setmealId: number;
	dishFlavor: string | null;
	number: number;
	amount: number;
	image: string;
}

export interface Setmeal {
	id: number;
	name: string;
	categoryId: number;
	price: number;
	image: string;
	description: string;
	status: Status;
	createTime: string;
	updateTime: string;
	createUser: number;
	updateUser: number;
}

export interface SetmealDish {
	id: number;
	setmealId: number;
	dishId: number;
	name: string;
	price: number;
	copies: number;
}

export type Status = (typeof STATUS)[keyof typeof STATUS];

export type CategoryType = (typeof CATEGORY_TYPE)[keyof typeof CATEGORY_TYPE];

export type Gender = (typeof GENDER)[keyof typeof GENDER];

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

export type PayMethod = (typeof PAY_METHOD)[keyof typeof PAY_METHOD];

export type ReminderStatus = (typeof REMINDER_STATUS)[keyof typeof REMINDER_STATUS];
