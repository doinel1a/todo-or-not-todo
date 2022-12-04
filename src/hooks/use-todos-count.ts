import { useEffect, useState } from 'react';

import useTodos from './use-todos';

export default function useTodosCount() {
	const { todos } = useTodos();
	const [totalTodos, setTotalTodos] = useState(0);
	const [activeTodos, setActiveTodos] = useState(0);
	const [completedTodos, setCompletedTodos] = useState(0);

	useEffect(() => {
		setTotalTodos(todos.length);
		setActiveTodos(todos.filter((todo) => !todo.isDone).length);
		setCompletedTodos(todos.filter((todo) => todo.isDone).length);
	}, [todos]);

	return {
		totalTodos,
		activeTodos,
		completedTodos
	};
}
