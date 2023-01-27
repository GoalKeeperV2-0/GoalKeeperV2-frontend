import React from 'react';
import AuthLayout from 'app.components/AuthLayout';
import BaseTemplate from 'app.components/BaseTemplate';

import PerformInput from 'app.components/Input/PerformInput';
import Select from 'app.components/Select';

import { ReactComponent as BackIcon } from 'app.modules/assets/icons/chevron-left.svg';
import { Link } from 'react-router-dom';
import { SERVICE_URL } from 'app.modules/constants/ServiceUrl';
import { IForm, Action, signUpFormState } from '../states/signUpForm';
import SubmitButton from '../components/SubmitButton';
import EmailInputArea from '../components/EmailInputArea';
import PasswordInputArea from '../components/PasswordInputArea';
import NicknameInputArea from '../components/NicknameInputArea';
import OptionalInputArea from '../components/OptionalInputArea';
import GoogleLoginButton from '../components/GoogleLoginButton';

interface Props {
	onSubmit: (event: React.SyntheticEvent) => void;
	// formState: IForm;
	// formDispatch: React.Dispatch<Action>;
	error: string;
}

export const GenderOption = [
	{ id: 1, value: '남자' },
	{ id: 2, value: '여자' },
	{ id: 3, value: '없음' },
];
export const AgeOption = [
	{ id: 10, value: '10대' },
	{ id: 20, value: '20대' },
	{ id: 30, value: '30대' },
	{ id: 40, value: '40대' },
	{ id: 50, value: '50대' },
	{ id: 60, value: '60대' },
];

function SignUpView({ error, onSubmit }: Props) {
	const ageOptions = ['10대', '20대', '30대', '40대', '50대', '60대', '70대', '80대 이상']; // TODO: 백엔드에 80대 이상은 80으로 표기할거라고 말하기
	const getBtnState = () => {
		const { email, password, passwordCheck, nickName } = signUpFormState;
		if (!email.trim() || !password.trim() || !passwordCheck.trim() || !nickName.trim()) return false;

		return true;
	};
	return (
		<BaseTemplate>
			<form onSubmit={onSubmit} className="mx-auto pc:w-[58.5rem]  flex flex-col items-start">
				<div className="flex items-center  mb-[30px]   pc:mb-[36px]">
					<BackIcon className="pc:hidden pc:w-0 mr-[1.2rem]" />
					<h3 className="h-[2.6rem]">회원가입</h3>
				</div>
				<GoogleLoginButton />
				<div className="space-y-[1.6rem] w-full mt-[2rem] mb-[4.1rem] pc:space-y-[4.5rem] pc:mt-[6.2rem] pc:mb-[5.2rem]">
					<EmailInputArea onChange={() => null} value="" isValid={null} />
					<PasswordInputArea onChange={() => null} value="" isValid={null} errorContent="" />
					<NicknameInputArea onChange={() => null} value="" isValid={null} />
					<OptionalInputArea />
				</div>
				<div className="hidden pc:flex space-x-[0.5rem] justify-end w-full mb-[2.4rem]  font-medium text-[1.8rem] leading-[2.16rem] text-primaryBlack-300">
					<span>이미 골키퍼에 가입하셨나요?</span>
					<Link to={SERVICE_URL.login}>
						<span className="text-primaryOrange-200">로그인</span>
					</Link>
				</div>
				<SubmitButton onClick={() => null} isLoading={false} disabled={getBtnState()}>
					회원가입
				</SubmitButton>
			</form>
		</BaseTemplate>
	);
}

export default SignUpView;
// eslint-disable-next-line no-lone-blocks
{
	/*
	<PerformInput
					label="비밀번호"
					isRequired
					value={signUpFormState.password}
					type="password"
					placeholder="비밀번호 (8자리 이상)"
					onChange={(curVar: string) => '수정필요'}
				/>
				<div className="mb-[10px]" />
				<PerformInput
					type="password"
					isRequired
					value={signUpFormState.passwordCheck}
					placeholder="비밀번호 확인"
					onChange={(curVar: string) => '수정필요'}
				/>
				<div className="mb-[22px] pc:mb-[30px]" />
				<PerformInput
					label="닉네임"
					isRequired
					type="nickName"
					placeholder="닉네임을 작성해 주세요"
					onChange={(curVar: string) => '수정필요'}
				/>
			
				<div className="flex pc:space-x-[8px] space-x-[4px] pc:mb-[10px] mb-[8px]">
					<span className="font-semibold text-[20px]">선택사항</span>
				</div>
				<div className="flex justify-between w-full space-x-[2%]" />
				<div className="mt-[7px]">
					<span className={` ${error ? 'text-red-400' : 'text-white'}`}>
					{error || 'errorZone'}</span>
				</div>
	
	*/
}
