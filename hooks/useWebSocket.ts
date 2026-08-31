"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { UseWebSocketOptions, WebSocketStatus } from "@/types";

export function useWebSocket<T = unknown>(url: string, options: UseWebSocketOptions<T> = {}) {
	const {
		autoConnect = true,
		reconnect = true,
		reconnectInterval = 3000,
		maxReconnectCount = 5,
		onMessage,
		onOpen,
		onClose,
		onError,
	} = options;

	/**
	 * WebSocket 实例
	 */
	const socketRef = useRef<WebSocket | null>(null);

	/**
	 * 当前连接是否是主动关闭
	 */
	const manualCloseRef = useRef(false);

	/**
	 * 重连定时器
	 */
	const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	/**
	 * 当前重连次数
	 */
	const reconnectCountRef = useRef(0);

	/**
	 * 保存最新的配置
	 *
	 * 避免 onMessage 等函数变化导致 WebSocket
	 * 被重复创建。
	 */
	const optionsRef = useRef({
		reconnect,
		reconnectInterval,
		maxReconnectCount,
	});

	useEffect(() => {
		optionsRef.current = {
			reconnect,
			reconnectInterval,
			maxReconnectCount,
		};
	}, [reconnect, reconnectInterval, maxReconnectCount]);

	/**
	 * 保存事件回调
	 */
	const onMessageRef = useRef(onMessage);
	const onOpenRef = useRef(onOpen);
	const onCloseRef = useRef(onClose);
	const onErrorRef = useRef(onError);

	useEffect(() => {
		onMessageRef.current = onMessage;
	}, [onMessage]);

	useEffect(() => {
		onOpenRef.current = onOpen;
	}, [onOpen]);

	useEffect(() => {
		onCloseRef.current = onClose;
	}, [onClose]);

	useEffect(() => {
		onErrorRef.current = onError;
	}, [onError]);

	/**
	 * WebSocket 状态
	 */
	const [status, setStatus] = useState<WebSocketStatus>("CLOSED");

	/**
	 * 连接函数
	 */
	const connect = useCallback(() => {
		const oldSocket = socketRef.current;

		/**
		 * 已经连接或者正在连接
		 */
		if (
			oldSocket &&
			(oldSocket.readyState === WebSocket.OPEN || oldSocket.readyState === WebSocket.CONNECTING)
		) {
			return;
		}

		/**
		 * 清除旧的 socket
		 */
		socketRef.current = null;

		manualCloseRef.current = false;

		setStatus("CONNECTING");

		console.log("WebSocket connecting:", url);

		const socket = new WebSocket(url);

		socketRef.current = socket;

		socket.onopen = () => {
			/**
			 * 防止旧 socket 的事件影响新 socket
			 */
			if (socketRef.current !== socket) {
				return;
			}

			console.log("WebSocket connected:", url);

			reconnectCountRef.current = 0;

			setStatus("OPEN");

			onOpenRef.current?.();
		};

		socket.onmessage = event => {
			/**
			 * 防止旧 socket 的消息影响当前连接
			 */
			if (socketRef.current !== socket) {
				return;
			}

			let data: T;

			try {
				data = JSON.parse(event.data);
			} catch {
				data = event.data as T;
			}

			onMessageRef.current?.(data);
		};

		socket.onerror = event => {
			if (socketRef.current !== socket) {
				return;
			}

			console.error("WebSocket error:", event);

			onErrorRef.current?.(event);
		};

		socket.onclose = () => {
			/**
			 * 防止旧 socket 的 close 事件
			 * 影响新 socket
			 */
			if (socketRef.current === socket) {
				socketRef.current = null;
			}

			setStatus("CLOSED");

			onCloseRef.current?.();

			/**
			 * 主动关闭
			 */
			if (manualCloseRef.current) {
				return;
			}

			const { reconnect, reconnectInterval, maxReconnectCount } = optionsRef.current;

			/**
			 * 不自动重连
			 */
			if (!reconnect) {
				return;
			}

			/**
			 * 达到最大重连次数
			 */
			if (reconnectCountRef.current >= maxReconnectCount) {
				console.warn("WebSocket reconnect limit reached");

				return;
			}

			reconnectCountRef.current++;

			console.log(`WebSocket reconnect in ${reconnectInterval}ms`);

			reconnectTimerRef.current = setTimeout(() => {
				/**
				 * 只有当前没有连接的时候才重连
				 */
				if (!socketRef.current) {
					connect();
				}
			}, reconnectInterval);
		};
	}, [url]);

	/**
	 * 断开连接
	 */
	const disconnect = useCallback(() => {
		manualCloseRef.current = true;

		/**
		 * 清除重连定时器
		 */
		if (reconnectTimerRef.current) {
			clearTimeout(reconnectTimerRef.current);

			reconnectTimerRef.current = null;
		}

		const socket = socketRef.current;

		if (!socket) {
			setStatus("CLOSED");
			return;
		}

		/**
		 * 只关闭已经建立连接的 WebSocket
		 *
		 * CONNECTING 状态直接 close()
		 * 就容易出现：
		 *
		 * WebSocket is closed before the connection
		 * is established
		 */
		if (socket.readyState === WebSocket.OPEN) {
			setStatus("CLOSING");

			socket.close();
		} else if (socket.readyState === WebSocket.CONNECTING) {
			/**
			 * 正在连接时：
			 *
			 * 不再等待它建立连接，
			 * 直接标记当前 socket 无效。
			 */
			socket.onopen = null;
			socket.onmessage = null;
			socket.onerror = null;
			socket.onclose = null;

			socketRef.current = null;

			setStatus("CLOSED");
		} else {
			socketRef.current = null;

			setStatus("CLOSED");
		}
	}, []);

	/**
	 * 发送消息
	 */
	const send = useCallback(<D = unknown>(data: D) => {
		const socket = socketRef.current;

		if (!socket || socket.readyState !== WebSocket.OPEN) {
			console.warn("WebSocket is not connected");

			return false;
		}

		socket.send(typeof data === "string" ? data : JSON.stringify(data));

		return true;
	}, []);

	/**
	 * 自动连接
	 */
	useEffect(() => {
		if (!autoConnect) {
			return;
		}

		connect();

		return () => {
			/**
			 * 组件卸载
			 */
			manualCloseRef.current = true;

			/**
			 * 清除重连定时器
			 */
			if (reconnectTimerRef.current) {
				clearTimeout(reconnectTimerRef.current);

				reconnectTimerRef.current = null;
			}

			const socket = socketRef.current;

			if (!socket) {
				return;
			}

			/**
			 * 如果还在 CONNECTING 状态，
			 * 不调用 close()，避免：
			 *
			 * WebSocket is closed before the connection
			 * is established
			 */
			if (socket.readyState === WebSocket.CONNECTING) {
				socket.onopen = null;
				socket.onmessage = null;
				socket.onerror = null;
				socket.onclose = null;

				socketRef.current = null;

				return;
			}

			/**
			 * 已连接
			 */
			if (socket.readyState === WebSocket.OPEN) {
				socket.close();
			}

			socketRef.current = null;
		};
	}, [autoConnect, connect]);

	return {
		status,

		isConnected: status === "OPEN",

		connect,

		disconnect,

		send,
	};
}
