import React from 'react';

import AddList from '../components/lists/add-list';
import Lists from '../components/lists/lists';

export default function Dashboard() {
	return (
		<>
			<AddList />
			<Lists />
		</>
	);
}
