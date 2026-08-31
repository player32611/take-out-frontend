import type { MessageHandler, StatusHandler, WebSocketStatus } from "@/types";

class WebSocketClient {
	private socket: WebSocket | null = null;

	private readonly url: string;

	private reconnectTimer: ReturnType<typeof setTimeout> | null = null;

	private reconnectCount = 0;

	private readonly maxReconnectCount = 5;

	private readonly reconnectInterval = 3000;

	private closed = false;

	private messageHandlers: MessageHandler[] = [];

	private statusHandlers: StatusHandler[] = [];

	constructor(url: string) {
		this.url = url;
	}

	/**
	 * 建立连接
	 */
	connect() {
		if (
			this.socket &&
			(this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)
		) {
			return;
		}

		this.closed = false;

		this.notifyStatus("CONNECTING");

		this.socket = new WebSocket(this.url);

		this.socket.onopen = () => {
			console.log("WebSocket 连接成功");

			this.reconnectCount = 0;

			this.notifyStatus("OPEN");
		};

		this.socket.onmessage = event => {
			try {
				const data = JSON.parse(event.data);

				this.messageHandlers.forEach(handler => {
					handler(data);
				});
			} catch {
				// 如果后端不是 JSON，也可以直接返回字符串
				this.messageHandlers.forEach(handler => {
					handler(event.data);
				});
			}
		};

		this.socket.onerror = error => {
			console.error("WebSocket 错误", error);
		};

		this.socket.onclose = () => {
			console.log("WebSocket 连接关闭");

			this.notifyStatus("CLOSED");

			this.socket = null;

			// 不是主动关闭才进行重连
			if (!this.closed) {
				this.reconnect();
			}
		};
	}

	/**
	 * 自动重连
	 */
	private reconnect() {
		if (this.reconnectCount >= this.maxReconnectCount) {
			console.log("WebSocket 重连次数已达到上限");
			return;
		}

		this.reconnectCount++;

		console.log(`WebSocket ${this.reconnectInterval / 1000}s 后第 ${this.reconnectCount} 次重连`);

		this.reconnectTimer = setTimeout(() => {
			this.connect();
		}, this.reconnectInterval);
	}

	/**
	 * 发送消息
	 */
	send<T>(data: T) {
		if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
			console.warn("WebSocket 尚未连接");
			return false;
		}

		this.socket.send(typeof data === "string" ? data : JSON.stringify(data));

		return true;
	}

	/**
	 * 监听消息
	 */
	onMessage<T = unknown>(handler: MessageHandler<T>) {
		this.messageHandlers.push(handler as MessageHandler);

		// 返回取消监听的方法
		return () => {
			this.messageHandlers = this.messageHandlers.filter(item => item !== handler);
		};
	}

	/**
	 * 监听连接状态
	 */
	onStatus(handler: StatusHandler) {
		this.statusHandlers.push(handler);

		return () => {
			this.statusHandlers = this.statusHandlers.filter(item => item !== handler);
		};
	}

	/**
	 * 通知状态
	 */
	private notifyStatus(status: WebSocketStatus) {
		this.statusHandlers.forEach(handler => {
			handler(status);
		});
	}

	/**
	 * 主动关闭
	 */
	disconnect() {
		this.closed = true;

		if (this.reconnectTimer) {
			clearTimeout(this.reconnectTimer);
			this.reconnectTimer = null;
		}

		if (this.socket) {
			this.socket.close();
			this.socket = null;
		}
	}

	/**
	 * 当前连接状态
	 */
	get readyState() {
		return this.socket?.readyState ?? WebSocket.CLOSED;
	}
}

export default WebSocketClient;
