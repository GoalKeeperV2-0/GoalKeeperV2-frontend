/* eslint-disable react/jsx-props-no-spreading */
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from 'store/slices';
// import modalSlice, { ModalComponentState } from 'store/slices/modalSlice';
import React, { useEffect, useRef, Suspense } from 'react';
// import modalList from 'utils/importModal';
import { Router, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import ModalLayout from './Layout';
// import Path from 'utils/path';

export default function ModalSection() {
	const bodyRef = useRef<HTMLDivElement>(null);
	const modalRef = useRef<HTMLDivElement>(null);
	// const { openList, isOpenModal } = useSelector((state: RootState) => state.modal);
	// const dispatch = useDispatch();
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const [searchParams] = useSearchParams();
	console.log('모달오픈');
	/*	useEffect(() => {
		if (isOpenModal) {
			document.body.style.cssText = `
			  position: fixed;
			  overflow: hidden;
			  width: 100%;
			  height: 100%
			`;
			return;
		}
		document.body.style.cssText = '';
	}, [isOpenModal]);
    */

	/*	const handleModalClick = (e: React.BaseSyntheticEvent | MouseEvent) => {
		const { target } = e;

		if (modalRef.current === target || bodyRef.current === target) {
			if (searchParams.get('goal')) {
				navigate(-1);
				dispatch(modalSlice.actions.close());
				document.body.style.cssText = '';
				return;
			}
			dispatch(modalSlice.actions.close());
		}
	};
*/
	return (
		<Suspense fallback={<div>정보를 불러오는 중이에요.</div>}>
			<ModalLayout />
		</Suspense>
	);
}
