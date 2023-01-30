/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import Header from './HeaderNew';
import ModalSection from './Modal/ModalSection';

interface TemplateProps {
	isAdmin?: string | null;
	children: React.ReactNode;
}

export default function BaseTemplate({ isAdmin, children }: TemplateProps) {
	return (
		<div className="main pc:max-w-[120rem] mx-auto  pb-[2rem] px-[2rem]">
			<Header />
			<main>{children}</main>
			<ModalSection />
		</div>
	);
}
