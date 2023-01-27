import Button from 'app.components/Button';
import React from 'react';
import { ReactComponent as GoogleIcon } from 'app.modules/assets/icons/brand/google.svg';
import { GOOGLE_AUTH_URL } from '../constants';

function GoogleLoginButton() {
	return (
		<Button variant="solid" size="lg" bgColor="buttonGray-100">
			<div className="flex items-center  space-x-[1rem] p-[1.6rem] pc:p-[2.4rem] text-buttonGray-400 bg-buttonGray-100">
				<GoogleIcon className="w-[1.2rem] pc:w-[2rem]" />
				<a href={GOOGLE_AUTH_URL}>구글계정으로 로그인</a>
			</div>
		</Button>
	);
}

export default GoogleLoginButton;
