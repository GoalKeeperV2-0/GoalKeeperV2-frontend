import BaseLayout from 'app.components/BaseLayout';
import HomeScreen from 'app.features/Home/screens/HomeScreen';
import { useCertList } from 'app.modules/hooks/useCertList';
import React from 'react';

function HomePage() {
	const { data: certs } = useCertList(0);
	return (
		<BaseLayout>
			<HomeScreen certs={certs?.certificationResponses?.content?.slice(0, 6)} />
		</BaseLayout>
	);
}

export default HomePage;
