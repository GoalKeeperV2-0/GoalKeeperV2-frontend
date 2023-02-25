import Label from 'app.components/App.base/Input/Label';
import { getDayDiff } from 'app.modules/utils/getDayDiff';
import React from 'react';
import { ReactComponent as CameraIcon } from 'app.modules/assets/manageGoal/camera.svg';
import { CertType } from '../types';

interface Props {
	todayString: string;
	certification: CertType | null;
	certDate: string;
}
function CertImage({ todayString, certification, certDate }: Props) {
	const getDday = () => {
		return getDayDiff(todayString, certDate);
	};
	const getBoxMessage = () => {
		const res = '';
		/*if (!goal.certifications) return res;
		const { state } = goal.certifications[0];
		switch (state) {
			case 'SUCCESS':
				res = '인증을 성공했어요';
				break;
			case 'FAIL':
				if (goal.state === 'HOLD') res = '검토를 요청할 수 있어요';
				else res = '인증을 실패했어요';
				break;

			default:
				res = '';
				break;
		}
*/
		return res;
	};
	console.log(getDday());
	return (
		<>
			{/* TODO: cert 없는 경우 처리*/}

			<div className="flex flex-col space-y-[1.2rem]">
				<Label
					required
					htmlFor="certImage"
					content="인증 사진"
					className={`${getDday() < 0 ? 'text-[#828282]' : ''}`}
				/>
				{certification === null && getDday() >= 0 ? (
					<label
						htmlFor="certImage"
						className="w-[46.4rem] h-[24.5rem] border-[0.1rem] border-[#E7E7E7] rounded-[0.8rem] grid place-content-center "
					>
						<div className="flex flex-col items-center space-y-[1rem]">
							<CameraIcon />
							<span className="text-primaryBlack-300 pc:text-body1-pc">
								{getDday() > 0 ? `${getDday()}일 후 등록 할 수 있어요.` : '0/1'}
							</span>
						</div>
						<input id="certImage" disabled={getDday() !== 0} type="file" accept="image/*" className=" hidden" />
					</label>
				) : (
					<div
						className="w-[46.4rem] h-[24.5rem]  rounded-[0.8rem] bg-cover relative"
						style={{ backgroundImage: `url(${certification?.picture})` }}
					>
						<div className=" w-full   h-[3.6rem] flex items-center px-[1.6rem] absolute bg-primaryBlack-500 bg-opacity-80 rounded-t-[0.8rem] text-white pc:text-body1-pc text-start  space-x-[0.8rem]">
							{certification?.state !== 'ONGOING' && (
								<img alt="" src={`/images/goalBox/icon/${certification?.state}.svg`} className="mr-[0.8rem]" />
							)}
							{getBoxMessage()}
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export default CertImage;