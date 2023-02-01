/* eslint-disable jsx-a11y/click-events-have-key-events */
import { SERVICE_URL } from 'app.modules/constants/ServiceUrl';
import React from 'react';
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
	console.log(window.location.pathname);
	return (
		<div className="main pc:max-w-[120rem] mx-auto  pb-[2rem] px-[2rem] pc:px-0 ">
			<Header />

			<main className="flex mt-[3.3rem] pc:mt-[7.4rem]">
				{!ASIDE_NOT_INCLUDE.includes(window.location.pathname) && <Aside />}
				{children}
			</main>
			<ModalSection />
		</div>
	);
}
//
