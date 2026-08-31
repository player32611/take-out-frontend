export interface UseWebSocketOptions<T = unknown> {
	/**
	 * 是否自动连接
	 */
	autoConnect?: boolean;

	/**
	 * 是否自动重连
	 */
	reconnect?: boolean;

	/**
	 * 重连间隔
	 */
	reconnectInterval?: number;

	/**
	 * 最大重连次数
	 */
	maxReconnectCount?: number;

	/**
	 * 收到消息
	 */
	onMessage?: (data: T) => void;

	/**
	 * 连接成功
	 */
	onOpen?: () => void;

	/**
	 * 连接关闭
	 */
	onClose?: () => void;

	/**
	 * 连接错误
	 */
	onError?: (event: Event) => void;
}
