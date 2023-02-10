import BaseLayout from 'app.components/BaseLayout';
import HomeScreen from 'app.features/Home/screens/HomeScreen';
import React, { useEffect } from 'react';

function Home() {
	return (
		<BaseLayout>
			<HomeScreen />
		</BaseLayout>
	);
}

export default Home;
