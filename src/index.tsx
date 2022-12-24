import './css/global.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './app';
import store from './store/store';

const container = document.querySelector('#root');
const root = createRoot(container as HTMLElement);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
