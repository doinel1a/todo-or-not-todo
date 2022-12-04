import React from 'react';
import { Provider } from 'react-redux';

import AddTodo from './components/add-todo';
import Navbar from './components/navbar';
import TodoList from './components/todo-list';
import store from './store/store';

export default function App() {
	return (
		<React.StrictMode>
			<Provider store={store}>
				<div className='w-screen h-screen absolute flex flex-col items-center text-color bg-primary'>
					<Navbar />
					<main className='w-full max-w-xl max-h-full relative flex flex-col items-center my-4 p-4 rounded-lg bg-secondary overflow-hidden'>
						<AddTodo />
						<TodoList />
					</main>
				</div>
			</Provider>
		</React.StrictMode>
	);
}
