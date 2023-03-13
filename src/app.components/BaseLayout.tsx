/* eslint-disable jsx-a11y/click-events-have-key-events */
import { SERVICE_URL } from 'app.modules/constants/ServiceUrl';
import { modalState } from 'app.modules/store/modal';
import React from 'react';
import { useRecoilState } from 'recoil';
import Aside from './Aside';
// import Aside from './Aside';
import Header from './Header';
import ModalSection from './Modal/ModalSection';

interface TemplateProps {
	isAdmin?: string | null;
	children: React.ReactNode;
}
const ASIDE_NOT_INCLUDE = [SERVICE_URL.login, SERVICE_URL.signUp, SERVICE_URL.oauth2Register];
export default function BaseTemplate({ isAdmin, children }: TemplateProps) {
	const [modal, setModal] = useRecoilState(modalState);
	return (
		<div className="main pc:max-w-[120rem] mx-auto  pb-[2rem] px-[2rem] pc:px-0">
			<Header />

			<main className="flex mt-[3.3rem] pc:mt-[7.4rem]">
				{!ASIDE_NOT_INCLUDE.includes(window.location.pathname) && <Aside />}
				<div className="min-w-[89.4rem] w-[89.4rem]">{children}</div>
			</main>
			{modal.isOpen && <ModalSection />}
		</div>
	);
}
//
