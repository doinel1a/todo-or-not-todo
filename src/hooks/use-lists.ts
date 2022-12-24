import { useEffect } from 'react';
import { IList } from 'types/list';

import { LISTS_KEY } from '../config/consts';
import setTodos from '../slices/lists-slice';
import { setToStorage } from '../utils/local-storage';
import { useAppDispatch, useAppSelector } from './use-redux';

export default function useLists() {
	const lists = useAppSelector((state) => state.lists);
	const dispatch = useAppDispatch();

	useEffect(() => {
		setToStorage(LISTS_KEY, lists);
	}, [lists]);

	return {
		lists,
		setLists: (todos: IList[]) => dispatch(setTodos(todos))
	};
}
