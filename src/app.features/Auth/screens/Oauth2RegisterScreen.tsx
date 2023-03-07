import { UseMutateFunction } from '@tanstack/react-query';
import { Oauth2RegisterBody } from 'app.modules/api/auth';
import { AxiosResponse } from 'axios';
import React, { useState } from 'react';
import NicknameInputArea from '../components/signUp/NicknameInputArea';
import OptionalInputArea from '../components/signUp/OptionalInputArea';
import SubmitButton from '../../../app.components/SubmitButton';

interface Props {
	// TODO: 타입 범용적으로 정의해두기
	// TODO: 회원가입 버튼 disabled 상태 만들기
	patchUser: UseMutateFunction<AxiosResponse<any, any>, unknown, Oauth2RegisterBody, unknown>;
	isLoading: boolean;
}
function Oauth2RegisterView({ patchUser, isLoading }: Props) {
	const [body, setBody] = useState<Oauth2RegisterBody>({ description: '', age: null, sex: null });
	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!body) return;
		console.log(body);
		patchUser(body);
	};
	const onNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// TODO: 백엔드에 지금 이 필드 없음
	};
	const onOptionSelect = (e: React.BaseSyntheticEvent) => {
		const {
			target: { name, value },
		} = e;
		// TODO: age,sex null 값 못 보내는지 ?
		setBody((prev) => ({ ...prev, [name]: value }));
	};
	return (
		<form onSubmit={onSubmit} className="w-full mx-auto pc:mt-[2.4rem] pc:w-[58.5rem]  flex flex-col items-start">
			<h3 className="h-[2.6rem]">구글계정 회원가입을 마무리하세요!</h3>
			<div className="space-y-[1rem] w-full mt-[2rem] mb-[4rem] pc:space-y-[3rem] pc:mt-[6.2rem] pc:mb-[6rem]">
				<NicknameInputArea onChange={() => null} value="백엔드에 이 필드 없음" isValid={null} />
				<OptionalInputArea onSelect={onOptionSelect} sex={body?.sex ?? null} age={body?.age ?? null} />
			</div>

			<SubmitButton isLoading={false} disabled={false}>
				회원가입
			</SubmitButton>
		</form>
	);
}

export default Oauth2RegisterView;
