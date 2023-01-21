import Button from 'app.components/Button';
import React, { useEffect } from 'react';

function Home() {
	// console.log(GOOGLE_AUTH_URL);
	console.log(process.env.REACT_APP_GOOGLE_REDIRECT_URI);
	return (
		<div>
			<span>디자인시스템들</span>
			<Button variant="solid" size="lg" bgColor="primaryOrange-200" textColor="primaryWhite">
				이메일 인증
			</Button>
			<Button variant="solid" size="lg" bgColor="primaryOrange-200" textColor="primaryWhite">
				이메일 인증
			</Button>
		</div>
	);
}

export default Home;
