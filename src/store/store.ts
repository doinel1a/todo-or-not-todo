import { configureStore } from '@reduxjs/toolkit';

import { todosSlice } from '../slices/todos-slice';

const store = configureStore({
	reducer: {
		todos: todosSlice.reducer
	}
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
