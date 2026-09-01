import type {
	CategoryType,
	DishFlavor,
	Employee,
	OrderDetail,
	Orders,
	OrderStatus,
	ReminderStatus,
	SetmealDish,
	Status,
} from "./common";

export interface Response<T = unknown> {
	code: number;
	data: T;
	msg: string;
}

export interface PageResult<T = unknown> {
	total: number;
	records: T[];
}

export type WebSocketStatus = "CONNECTING" | "OPEN" | "CLOSING" | "CLOSED";

export interface CategoryAddParams {
	id?: number;
	name: string;
	sort: number;
	type: CategoryType;
}

export interface CategoryUpdateParams {
	id: number;
	name: string;
	sort: number;
	type: CategoryType;
}

export interface CategoryPageParams {
	name?: string;
	page: number;
	pageSize: number;
	type?: CategoryType;
}

export interface CategoryStatusParams {
	status: Status;
	id: number;
}

export interface CategoryDeleteParams {
	id: number;
}

export interface CategoryListParams {
	type?: CategoryType;
}

export interface CommonUploadParams {
	file: File;
}

export interface DishAddParams {
	id?: number;
	name: string;
	categoryId: number;
	price: number;
	image: string;
	description?: string;
	status?: Status;
	flavors?: { dishId?: number; id?: number; name: string; value: string }[];
}

export interface DishPageVO {
	id: number;
	name: string;
	categoryId: number;
	price: number;
	image: string;
	description: string;
	status: Status;
	updateTime: string;
	categoryName: string;
}

export interface DishVO {
	id: number;
	name: string;
	categoryId: number;
	categoryName: string;
	price: number;
	image: string;
	description: string;
	status: Status;
	updateTime: string;
	flavors: DishFlavor[];
}

export interface DishPageParams {
	categoryId?: number;
	name?: string;
	page: number;
	pageSize: number;
	status?: Status;
}

export interface DishDeleteParams {
	ids: string;
}

export interface DishIdParams {
	id: number;
}

export interface DishUpdateParams {
	id: number;
	name: string;
	categoryId: number;
	price: number;
	image: string;
	description?: string;
	status?: Status;
	flavors?: { dishId?: number; id?: number; name: string; value: string }[];
}

export interface DishStatusParams {
	status: Status;
	id: number;
}

export interface EmployeeAddParams {
	id?: number;
	idNumber: string;
	name: string;
	phone: string;
	sex: string;
	username: string;
}

export interface EmployeeLoginData {
	id: number;
	name: string;
	username: string;
	token: string;
}

export interface EmployeeLoginParams {
	username: string;
	password: string;
}

export type EmployeePageData = PageResult<Employee>;

export interface EmployeePageParams {
	name?: string;
	page: number;
	pageSize: number;
}

export interface EmployeeStatusParams {
	status: Status;
	id: number;
}

export interface EmployeeIdParams {
	id: number;
}

export interface EmployeeUpdateParams {
	id: number;
	idNumber: string;
	name: string;
	phone: string;
	sex: string;
	username: string;
}

export interface OrderSearchVO extends Orders {
	orderDishes: string;
}

export interface OrderSearchParams {
	beginTime?: string;
	endTime?: string;
	number?: string;
	page: number;
	pageSize: number;
	phone?: string;
	status?: OrderStatus;
}

export interface OrderDeliveryParams {
	id: number;
}

export interface OrderConfirmParams {
	id: number;
}

export interface OrderRejectionParams {
	id: number;
	rejectionReason: string;
}

export interface OrderCompleteParams {
	id: number;
}

export interface OrderDetailsParams {
	id: number;
}

export interface OrderCancelParams {
	id: number;
	cancelReason: string;
}

export interface OrderDetailsData extends Orders {
	orderDishes: string;
	orderDetailList: OrderDetail[];
}

export interface OrderStatisticsData {
	confirmed: number;
	deliveryInProgress: number;
	toBeConfirmed: number;
}

export interface ReportParams {
	begin: string;
	end: string;
}

export interface ReportTurnoverData {
	dateList: string;
	turnoverList: string;
}

export interface ReportUserData {
	dateList: string;
	newUserList: string;
	totalUserList: string;
}

export interface ReportOrdersData {
	dateList: string;
	orderCompletionRate: number;
	orderCountList: string;
	totalOrderCount: number;
	validOrderCount: number;
	validOrderCountList: string;
}

export interface ReportTop10Data {
	nameList: string;
	numberList: string;
}

export interface SetmealAddParams {
	id?: number;
	name: string;
	categoryId: number;
	price: number;
	image: string;
	description?: string;
	status: Status;
	setmealDishes: {
		copies: number;
		id?: number;
		dishId: number;
		name: string;
		price: number;
		setmealId?: number;
	}[];
}

export interface SetmealPageParams {
	categoryId?: number;
	name?: string;
	page: number;
	pageSize: number;
	status?: Status;
}

export interface SetmealPageVO {
	id: number;
	name: string;
	categoryId: number;
	price: number;
	image: string;
	description: string;
	status: Status;
	updateTime: string;
	categoryName: string;
}

export interface SetmealStatusParams {
	status: Status;
	id: number;
}

export interface SetmealIdParams {
	id: number;
}

export interface SetmealVO {
	id: number;
	name: string;
	categoryId: number;
	categoryName: string;
	price: number;
	image: string;
	description: string;
	status: Status;
	updateTime: string;
	setmealDishes: SetmealDish[];
}

export interface SetmealUpdateParams {
	id: number;
	name: string;
	categoryId: number;
	price: number;
	image: string;
	description?: string;
	status: Status;
	setmealDishes: {
		copies: number;
		id?: number;
		dishId: number;
		name: string;
		price: number;
		setmealId?: number;
	}[];
}

export interface SetmealDeleteParams {
	ids: string;
}

export interface ShopSetStatusParams {
	status: Status;
}

export interface WebSocketMessageData {
	message: string;
	orderId: number;
	type: ReminderStatus;
}

export interface WorkspaceBusinessData {
	newUsers: number;
	orderCompletionRate: number;
	turnover: number;
	unitPrice: number;
	validOrderCount: number;
}

export interface WorkspaceOrdersData {
	allOrders: number;
	cancelledOrders: number;
	completedOrders: number;
	deliveredOrders: number;
	waitingOrders: number;
}

export interface WorkspaceDishesData {
	discontinued: number;
	sold: number;
}

export interface WorkspaceSetmealsData {
	discontinued: number;
	sold: number;
}
