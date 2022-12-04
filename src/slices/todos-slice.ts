// eslint-disable-next-line import/named
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TODOS_KEY } from '../config/consts';
import { ITodo } from '../types/todo';
import { existsInStorage, getFromStorage } from '../utils/local-storage';

const initialState = (): ITodo[] => {
	return existsInStorage(TODOS_KEY)
		? (getFromStorage(TODOS_KEY) as ITodo[])
		: [];
};

const todosSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		setTodos(state, { payload }: PayloadAction<ITodo[]>) {
			return payload;
		}
	}
});

const { setTodos } = todosSlice.actions;

export default setTodos;
export { todosSlice };
