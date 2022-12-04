import React from 'react';
import { Provider } from 'react-redux';

import Navbar from './components/navbar';
import store from './store/store';

export default function App() {
	return (
		<React.StrictMode>
			<Provider store={store}>
				<div className='w-screen h-screen absolute flex flex-col items-center text-color bg-primary'>
					<Navbar />
					<main className='w-full max-w-xl max-h-full relative flex flex-col items-center my-4 p-4 rounded-lg bg-secondary overflow-hidden'></main>
				</div>
			</Provider>
		</React.StrictMode>
	);
}
