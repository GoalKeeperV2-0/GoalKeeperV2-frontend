import Label from 'app.components/App.base/Input/Label';
import { getDayDiff } from 'app.modules/utils/getDayDiff';
import React from 'react';
import { ReactComponent as CameraIcon } from 'app.modules/assets/manageGoal/camera.svg';
import { CertType } from 'app.features/GoalManage/types';

interface Props {
	picture: string;
}
// TODO: 이미지 handler
function CertImage({ picture }: Props) {
	return (
		<>
			{/* TODO: cert 없는 경우 처리*/}

			<div className="flex flex-col space-y-[1.2rem]">
				<h2 className={`text-body5-mo pc:text-body5-pc `}>인증 사진</h2>

				<div
					className="w-[46.4rem] h-[24.5rem]  rounded-[0.8rem] bg-cover relative"
					style={{ backgroundImage: `url(https://api.goalkeeper.co.kr${picture})` }}
				/>
			</div>
		</>
	);
}

export default CertImage;
