import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import BaseTemplate from 'app.components/BaseTemplate';
import AuthLayout from 'app.components/AuthLayout';
import TextInput from 'app.components/Input/TextInputRev';
import { SERVICE_URL } from 'app.modules/constants/ServiceUrl';
import { GOOGLE_AUTH_URL } from '../constants';
import { IForm, Action, loginFormState } from '../states/loginForm';
import SubmitButton from '../components/SubmitButton';

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
		<BaseTemplate>
			<AuthLayout>
				<form onSubmit={onSubmit} className="pc:w-[585px] pc:h-full flex flex-col items-start justify-end">
					<div className="flex justify-between pc:my-[76px] w-[100%]">
						<h1 className="text-[20px] font-[800] pc:text-[36px]">{userLogin ? '로그인' : '관리자 로그인'}</h1>
						<button onClick={() => setUserLogin(!userLogin)} className="text-primaryOrange-200 ml-[20px]" type="button">
							{userLogin ? '관리자 로그인 >' : '유저 로그인 >'}
						</button>
					</div>
					{/* TODO:tailwind config 수정되면 배경색,텍스트색 바꾸기 */}
					<div className="rounded-[8px] flex p-[25px] space-x-[10px] w-full bg-[#FAFAFA] text-primaryGray-200 font-bold text-[18px] text-start ">
						<img src="/images/login/icons/google.svg" alt="google_icon" />
						<a href={GOOGLE_AUTH_URL} className="">
							구글계정으로 로그인
						</a>
					</div>
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

					<SubmitButton onClick={() => null} isLoading={false} disabled={getBtnState()}>
						로그인
					</SubmitButton>
					{userLogin && (
						<div className="visible w-full space-y-[16px] items-center  mt-[60px] flex flex-col pc:mt-0 pc:w-0 pc:h-0 pc:invisible  ">
							<span className="text-[12px]  text-primaryOrange-200">
								회원이 아직 아니신가요? <Link to={SERVICE_URL.signUp}>회원가입</Link>
							</span>
							<span className="text-[12px]  text-primaryGray-200">비밀번호를 잊으셨나요?</span>
						</div>
					)}
				</form>
			</AuthLayout>
		</BaseTemplate>
	);
}
export default LoginView;
