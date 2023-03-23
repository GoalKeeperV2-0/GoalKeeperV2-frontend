import Label from 'app.components/App.base/Input/Label';
import { getDayDiff } from 'app.modules/utils/getDayDiff';
import React from 'react';
import { ReactComponent as CameraIcon } from 'app.modules/assets/manageGoal/camera.svg';
import { ReactComponent as RetryIcon } from 'app.modules/assets/manageGoal/retry.svg';
import { getProgressText, getRequireSuccess } from 'app.modules/utils/getRequireSuccess';
import { CertType } from '../types';

interface Props {
	todayString: string;
	certification: CertType | null;
	certDate: string;
	onCertImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	certImagePreview: string | null;
	isCertModal?: boolean;
	point: number;
}
// TODO: 이미지 handler
function CertImage({
	todayString,
	certification,
	certDate,
	onCertImageChange,
	certImagePreview,
	point,
	isCertModal,
}: Props) {
	const getDday = () => {
		return getDayDiff(todayString, certDate);
	};
	const getBoxMessage = () => {
		let res = '';
		if (certification === null) return res;
		const { state } = certification;
		console.log(state);
		switch (state) {
			case 'SUCCESS':
				res = '인증을 성공했어요';
				break;
			case 'FAIL':
				res = '인증을 실패했어요';
				break;

			default:
				res = getProgressText(point, certification.successCount);
				break;
		}

		return res;
	};
	console.log(getDday());
	return (
		<>
			{/* TODO: cert 없는 경우 처리*/}

			<div className="flex flex-col space-y-[1.2rem]">
				<Label
					required={!certification?.picture && getDday() >= 0}
					htmlFor="certImage"
					content="인증 사진"
					className={`${getDday() > 0 ? 'text-[#828282]' : ''}`}
				/>
				{certification === null && getDday() >= 0 ? (
					<label
						htmlFor="certImage"
						className="cursor-pointer w-[46.4rem] relative h-[24.5rem] border-[0.1rem] border-[#E7E7E7]  rounded-[0.8rem] grid place-content-center "
					>
						{certImagePreview && getDday() === 0 ? (
							<>
								<div className="absolute rounded-[0.6rem] inset-0 top-0 space-y-[1rem] bg-black flex flex-col items-center justify-center  bg-opacity-20  z-[50]">
									<CameraIcon fill="white" />
									<div className="flex items-center">
										<RetryIcon className="mt-[0.2rem]" />
										<span className="text-white pc:text-body1-pc ">1/1</span>
									</div>
								</div>

								<div
									className="w-[46.4rem] h-[24.5rem]  rounded-[0.8rem] bg-cover relative"
									style={{ backgroundImage: `url(${certImagePreview as string})` }}
								/>
							</>
						) : (
							<>
								<div className="flex flex-col items-center space-y-[1rem]">
									<CameraIcon fill="#A6A6A6" />
									<span className="text-primaryBlack-300 pc:text-body1-pc">
										{getDday() > 0 ? `${getDday()}일 후 등록 할 수 있어요.` : '0/1'}
									</span>
								</div>
							</>
						)}
						<input
							id="certImage"
							onChange={onCertImageChange}
							disabled={getDday() !== 0}
							type="file"
							accept="image/*"
							className=" hidden"
						/>
					</label>
				) : (
					<div
						className="w-[46.4rem] h-[24.5rem]  rounded-[0.8rem] bg-cover relative"
						style={{ backgroundImage: `url(https://api.goalkeeper.co.kr${certification?.picture})` }}
					>
						{!isCertModal && (
							<div className=" w-full   h-[3.6rem] flex items-center px-[1.6rem] absolute bg-primaryBlack-500 bg-opacity-80 rounded-t-[0.8rem] text-white pc:text-body1-pc text-start  space-x-[0.8rem]">
								<img alt="" src={`/images/goalBox/icon/${certification?.state}.svg`} className="mr-[0.8rem]" />
								{getBoxMessage()}
							</div>
						)}
					</div>
				)}
			</div>
		</>
	);
}

export default CertImage;
