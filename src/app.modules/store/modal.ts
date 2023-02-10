import React from 'react';
import { atom } from 'recoil';

interface IModal {
	isOpen: boolean;
	render: React.ReactNode | null;
}
export const modalState = atom<IModal>({
	key: 'modalState',
	default: { isOpen: false, render: null },
});
