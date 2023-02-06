/* eslint-disable jsx-a11y/click-events-have-key-events */
import { modalState } from 'app.modules/store/modal';
import { stopPropagation } from 'app.modules/utils/stopPropagation';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
// TODO: 모달 렌더링 최적화 공부하기
function ModalLayout() {
	const [modal, setModal] = useRecoilState(modalState);

	/*useEffect(() => {
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = 'scroll';
		};
	}, []);*/
	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
		<div
			onClick={() => setModal({ ...modal, isOpen: false })}
			aria-modal
			className="bg-primaryBlack-500 bg-opacity-20 absolute  inset-0 h-full w-full grid place-content-center z-50 "
		>
			{/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
			<div onClick={stopPropagation} className="mx-auto w-[75rem] bg-buttonGray-100 rounded-[0.8rem] pc:p-[4rem]">
				{modal.render}
			</div>
		</div>
	);
}

export default ModalLayout;
