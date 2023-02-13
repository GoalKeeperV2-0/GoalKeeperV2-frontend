import Button from 'app.components/App.base/Button';
import UploadGoal from 'app.features/GoalUpload/modalContents/UploadGoal';
import { modalState } from 'app.modules/store/modal';
import React from 'react';
import { useRecoilState } from 'recoil';

function InitGoalBox() {
	const [modal, setModal] = useRecoilState(modalState);
	return (
		<button
			onClick={() => setModal({ render: <UploadGoal />, isOpen: true })}
			type="button"
			className=" rounded-[0.8rem] pc:rounded-[16px]  pc:w-[27.7rem]  pc:h-[31.4rem]  border-[0.1rem] border-borderGray text-[#828282]"
		>
			<div className="h-1/2 bg-buttonGray-200 pc:rounded-t-[1rem] bg-cover bg-[url('../../public/images/goalBox/init.svg')]" />
			<div className="h-1/2 p-[1.6rem] flex flex-col justify-between">
				<div className="flex items-center justify-between">
					<Button variant="solid" size="xs" bgColor="bg-buttonGray-200" className="w-[7.6rem] ">
						목표등록
					</Button>
					<div className={`${false && 'text-[#828282]'}`}>🗓 지금</div>
				</div>
				<div className="text-left flex flex-col space-y-[0.3rem]">
					<span className="pc:text-body1-pc text-primaryBlack-200">일반,지속</span>
					<span className="pc:text-body6-pc text-[#828282]">목표인증을 시작하세요!</span>
					<span className="pc:text-body1-pc text-primaryBlack-200">클릭해서 목표인증을 시작해요.</span>
				</div>
			</div>
		</button>
	);
}

export default InitGoalBox;
/*

<div className="bg-[#000] bg-opacity-[80%] text-white text-[10px] pc:text-[16px] leading-[12px] pc:leading-[19px] font-[500] p-[5px] pc:p-[8px] absolute top-0 right-0 left-0">
					ㅁㄴㅇㄹ
				</div>

<div className="flex justify-between items-center mb-[8px] pc:mb-[16px] text-[10px] pc:text-[16px] font-[600] leading-[12px] pc:leading-[19px]">
				<div className="flex">
					<div
						className={`p-[4px] pc:p-[8px] bg-buttonBlack-100 rounded-[4px] pc:rounded-[8px] mr-[4px] pc:mr-[8px] ${
							false && 'text-[#828282]'
						}`}
					>
						<span className="text-primaryBlack-200 text-[10px] pc:text-[16px] font-[600] leading-[12px] pc:leading-[19px]">
							#&nbsp;
						</span>
					</div>
					{/* <div className="p-[4px] pc:p-[8px] bg-buttonRed-100 rounded-[4px] pc:rounded-[8px] text-buttonRed-200">
        0/10회
    </div> 
    </div>
    <div className={`${false && 'text-[#828282]'}`}>⏰ 지금</div>
</div>
<div>
    <div
        title=""
        className={`mb-[4px] text-[12px] pc:text-[22px] font-[600] leading-[14px] pc:leading-[30px] text-ellipsis overflow-hidden whitespace-nowrap ${
            false && 'text-[#828282]'
        }`}
    >
        목표등록을 해보세요!
    </div>
    <div
        title="asdf"
        className="text-[10px] pc:text-[16px] font-[500] leading-[12px] pc:leading-[19px] text-primaryBlack-200 text-ellipsis overflow-hidden whitespace-nowrap"
    >
        골키퍼에서 목표등록을 진행해보세요!
    </div>
</div>


*/
