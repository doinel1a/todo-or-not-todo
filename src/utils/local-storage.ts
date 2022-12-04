/* eslint-disable unicorn/no-nested-ternary */
import { parseJSON } from './json';

export const existsInStorage = (key: string) => {
	return localStorage.getItem(key) ? true : false;
};

export const getFromStorage = (key: string) => {
	try {
		const item = localStorage.getItem(key);

		return item
			? parseJSON(item) !== undefined
				? parseJSON(item)
				: []
			: [];
	} catch (error) {
		console.warn(`Error reading local storage key - ${key}:`, error);

		return [];
	}
};

export const setToStorage = <T>(key: string, object: T) => {
	localStorage.setItem(key, JSON.stringify(object));
};
