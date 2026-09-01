const TOKEN_KEY = "token";
const NAME_KEY = "name";

export const setToken = (token: string) => {
	localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
	return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
	localStorage.removeItem(TOKEN_KEY);
};

export const setName = (name: string) => {
	localStorage.setItem(NAME_KEY, name);
};

export const getName = () => {
	if (typeof window === "undefined") {
		return "未知";
	}

	return localStorage.getItem(NAME_KEY);
};

export const removeName = () => {
	if (typeof window === "undefined") {
		return;
	}

	localStorage.removeItem(NAME_KEY);
};
