// components/RouterProvider.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { setRouter } from "@/services/axios";

export default function RouterProvider() {
	const router = useRouter();

	useEffect(() => {
		setRouter(router);
	}, [router]);

	return null;
}
