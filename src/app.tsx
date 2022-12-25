import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/navbar';
import useLists from './hooks/use-lists';
import Dashboard from './pages/dashboard';
import TasksList from './pages/tasks-list';

export default function App() {
	const { lists } = useLists();

	return (
		<Router>
			<div className='w-screen h-screen absolute flex flex-col items-center p-4 text-color-primary bg-primary'>
				<Navbar />
				<main className='w-full max-w-xl max-h-full relative flex flex-col items-center my-4 p-2 md:p-4 rounded-lg bg-secondary overflow-hidden'>
					<Routes>
						<Route path='/' element={<Dashboard />} />
						{lists.map((list) => (
							<Route
								key={list.id}
								path={`/${list.name.replaceAll(' ', '')}`}
								element={<TasksList list={list} />}
							/>
						))}
					</Routes>
				</main>
			</div>
		</Router>
	);
}
