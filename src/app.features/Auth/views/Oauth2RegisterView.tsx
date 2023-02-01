import React from 'react';
import NicknameInputArea from '../components/signUp/NicknameInputArea';
import OptionalInputArea from '../components/signUp/OptionalInputArea';
import SubmitButton from '../components/SubmitButton';

function Oauth2RegisterView() {
	return (
		<form onSubmit={() => null} className="w-full mx-auto pc:mt-[2.4rem] pc:w-[58.5rem]  flex flex-col items-start">
			<h3 className="h-[2.6rem]">구글계정 회원가입을 마무리하세요!</h3>
			<div className="space-y-[1rem] w-full mt-[2rem] mb-[4rem] pc:space-y-[3rem] pc:mt-[6.2rem] pc:mb-[6rem]">
				<NicknameInputArea onChange={() => null} value="" isValid={null} />
				<OptionalInputArea />
			</div>

			<SubmitButton onClick={() => null} isLoading={false} disabled={false}>
				회원가입
			</SubmitButton>
		</form>
	);
}

export default Oauth2RegisterView;
