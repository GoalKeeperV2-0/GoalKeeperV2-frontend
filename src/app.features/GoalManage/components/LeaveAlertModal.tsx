/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { ReactComponent as LeaveAlertGraphic } from 'app.modules/assets/manageGoal/leaveAlert.svg';
import ModalLayout from 'app.components/Modal/Layout';
import { stopPropagation } from 'app.modules/utils/stopPropagation';
import Button from 'app.components/App.base/Button';
interface Props {
	onCancel: () => void;
	confirmActionText: string;
	onConfirmAction: () => void;
	alertTitle: string;
	alertSubTitle: string;
}
function LeaveAlertModal({ onCancel, confirmActionText, alertTitle, alertSubTitle, onConfirmAction }: Props) {
	return (
		<div
			aria-modal
			className="pc:px-[2rem]  rounded-[1.6rem] py-[4rem]  bg-buttonGray-100 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[250] shadow-2xl w-[40rem]"
		>
			<div className="max-h-[80vh] overflow-y-auto scrollbar pc:px-[2rem]">
				<div className="flex flex-col items-center">
					<LeaveAlertGraphic className="w-full" />

					<span className="pc:text-body5-pc -mt-[5rem]">{alertTitle}</span>
					<span className="pc:text-body1-pc text-buttonGray-400 mt-[0.4rem]">{alertSubTitle}</span>
				</div>
				<div className="flex justify-between space-x-[0.8rem] mt-[5rem]">
					<Button onClick={onCancel} variant="solid" size="sm" bgColor="bg-buttonGray-200">
						<span className="pc:text-body1-pc">취소</span>
					</Button>
					<Button
						onClick={onConfirmAction}
						variant="solid"
						size="sm"
						bgColor="bg-primaryOrange-200"
						textColor="text-white"
					>
						<span className="pc:text-body1-pc">{confirmActionText}</span>
					</Button>
				</div>
			</div>
		</div>
	);
}

export default LeaveAlertModal;

//
//
//인증하기
