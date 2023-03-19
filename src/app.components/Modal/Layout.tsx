/* eslint-disable jsx-a11y/click-events-have-key-events */
import { modalState } from 'app.modules/store/modal';
import { stopPropagation } from 'app.modules/utils/stopPropagation';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
// TODO: 모달 렌더링 최적화 공부하기
function ModalLayout() {
	const [modal, setModal] = useRecoilState(modalState);

	useEffect(() => {
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = 'scroll';
		};
	}, []);
	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
		<div
			onClick={() => setModal({ ...modal, isOpen: false })}
			className="bg-primaryBlack-500 bg-opacity-20 fixed inset-0 z-[200]  "
		>
			{/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
			<div
				aria-modal
				onClick={stopPropagation}
				className="pc:px-[2rem] rounded-[1.6rem] py-[4rem] w-[75rem] bg-buttonGray-100 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
			>
				<div className="max-h-[80vh] overflow-y-auto scrollbar pc:px-[2rem]">{modal.render}</div>
			</div>
		</div>
	);
}

export default ModalLayout;
