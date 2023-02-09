import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import BaseTemplate from 'app.components/BaseLayout';
import TextInput from 'app.components/App.base/Input/TextInputRev';
import { SERVICE_URL } from 'app.modules/constants/ServiceUrl';

import { ReactComponent as LoginBanner } from 'app.modules/assets/banners/login.svg';
import { GOOGLE_AUTH_URL } from '../constants';
import { IForm, Action, loginFormState } from '../states/loginForm';
import SubmitButton from '../../../app.components/SubmitButton';
import GoogleLoginButton from '../components/GoogleLoginButton';
import EmailInputArea from '../components/login/EmailInputArea';
import PasswordInputArea from '../components/login/PasswordInputArea';

interface Props {
	onSubmit: (event: React.SyntheticEvent) => void;
	// formDispatch: React.Dispatch<Action>;
	error: string;
	// userLogin: boolean;
	// setUserLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

function LoginView({ error, onSubmit }: Props) {
	const getBtnState = () => {
		const { email, password } = loginFormState;
		if (!email.trim() || !password.trim()) return false;
		return true;
	};
	const [userLogin, setUserLogin] = useState<boolean>(true); // TODO: 관리자 로그인인지 판단하는 로직 필요
	return (
		<div className="mx-auto  flex  items-end w-full  pc:space-x-[13.2rem]">
			<LoginBanner className="hidden pc:flex w-[48.1rem] min-w-[48.1rem]" />
			<form onSubmit={onSubmit} className="w-full pc:w-[58.5rem] pc:min-w-[58.5rem] flex flex-col ">
				<div className="flex items-center justify-between">
					<h3 className="h-[2.6rem]">로그인</h3>
					<button onClick={() => setUserLogin(!userLogin)} className="text-primaryOrange-200 ml-[2rem]" type="button">
						{userLogin ? '관리자 로그인 >' : '유저 로그인 >'}
					</button>
				</div>
				<div className="space-y-[2rem] w-full mt-[2.1rem] mb-[4.6rem] pc:space-y-[3rem] pc:mt-[5.2rem] pc:mb-[15.1rem]">
					<GoogleLoginButton />
					<EmailInputArea onChange={() => null} value="" />
					<PasswordInputArea onChange={() => null} value="" />
				</div>
				<div className="flex justify-end w-full mb-[1.2rem] pc:mb-[2.4rem]  font-medium text-[1.2rem] leading-[2rem] pc:text-[1.8rem] pc:leading-[2.16rem] text-primaryBlack-300">
					<Link to={SERVICE_URL.signUp}>
						<span className="text-primaryOrange-200">회원가입</span>
					</Link>
				</div>
				<SubmitButton isLoading={false} disabled={false}>
					로그인
				</SubmitButton>
			</form>
		</div>
	);
}
export default LoginView;
/*

<div className="flex justify-between w-[100%]">
						<h3 className="">{userLogin ? '로그인' : '관리자 로그인'}</h3>
						<button onClick={() => setUserLogin(!userLogin)} className="text-primaryOrange-200 ml-[20px]" type="button">
							{userLogin ? '관리자 로그인 >' : '유저 로그인 >'}
						</button>
					</div>
					
					<GoogleLoginButton />
					<div className={`w-[100%] pc:mb-[100px] ${!userLogin ? 'mb-[39px]' : ''}`}>
						<TextInput
							label="이메일"
							isRequired={false}
							placeholder="이메일 주소"
							value={loginFormState.email}
							onChange={() => '다시정의'}
						/>
						<TextInput
							isPassword
							label="비밀번호"
							isRequired={false}
							placeholder="비밀번호"
							value={loginFormState.password}
							onChange={() => '다시정의'}
						/>
					</div>
					<SubmitButton onClick={() => null} isLoading={false}>
						회원가입
					</SubmitButton>

					{userLogin && (
						<>
							<div className="w-0 h-0 invisible pc:visible pc:w-full  pc:flex pc:justify-between ">
								<span className="text-[20px] font-semibold text-primaryGray-200">비밀번호를 잊으셨나요?</span>
								<span className="text-[20px] font-semibold text-primaryOrange-200">
									회원이 아직 아니신가요? <Link to={SERVICE_URL.signUp}>회원가입</Link>
								</span>
							</div>
							<div className=" mt-[17px]">
								<span className={` ${error ? 'text-red-400' : 'text-white'}`}>{error || 'errorZone'}</span>
							</div>
						</>
					)}

					{userLogin && (
						<div className="visible w-full space-y-[16px] items-center  mt-[60px] flex flex-col pc:mt-0 pc:w-0 pc:h-0 pc:invisible  ">
							<span className="text-[12px]  text-primaryOrange-200">
								회원이 아직 아니신가요? <Link to={SERVICE_URL.signUp}>회원가입</Link>
							</span>
							<span className="text-[12px]  text-primaryGray-200">비밀번호를 잊으셨나요?</span>
						</div>
					)}




*/
