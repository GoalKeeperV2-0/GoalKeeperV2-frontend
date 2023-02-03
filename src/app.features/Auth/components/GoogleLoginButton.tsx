import Button from 'app.components/App.base/Button';
import React from 'react';

import { GOOGLE_AUTH_URL } from '../constants';

function GoogleLoginButton() {
	return (
		<Button variant="solid" size="lg" bgColor="bg-buttonGray-100">
			<div className="before:content-[url('../../public/images/google.svg')]  before:scale-[60%] pc:before:scale-100 before:mr-[1rem] flex items-center  px-[1.6rem] pc:px-[2.4rem] text-buttonGray-400 bg-buttonGray-100">
				<a href={GOOGLE_AUTH_URL} className="mb-[0.2rem] pc:mb-[0.5rem]">
					구글계정으로 로그인
				</a>
			</div>
		</Button>
	);
}

export default GoogleLoginButton;
// https://velog.io/@mangozoo20/CSS-%EC%84%A0%ED%83%9D%EC%9E%90-%EC%A0%95%EB%A6%AC
