import { useEffect } from 'react';

import { TODOS_KEY } from '../config/consts';
import setTodos from '../slices/todos-slice';
import { ITodo } from '../types/todo';
import { setToStorage } from '../utils/local-storage';
import { useAppDispatch, useAppSelector } from './use-redux';

export default function useTodos() {
	const todos = useAppSelector((state) => state.todos);
	const dispatch = useAppDispatch();

	useEffect(() => {
		setToStorage(TODOS_KEY, todos);
	}, [todos]);

	return {
		todos,
		setTodos: (todos: ITodo[]) => dispatch(setTodos(todos))
	};
}
