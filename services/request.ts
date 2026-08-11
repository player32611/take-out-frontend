const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function request<T>(url: string, options?: RequestInit): Promise<T> {
	const response = await fetch(`${BASE_URL}${url}`, {
		...options,
		headers: {
			"Content-Type": "application/json",
			...options?.headers,
		},
	});

	if (!response.ok) {
		throw new Error(`HTTP Error: ${response.status}`);
	}

	return response.json();
}
