import Badge from 'app.components/App.base/Badge';
import Button from 'app.components/App.base/Button';
import Label from 'app.components/App.base/Input/Label';
import { ReactComponent as BlackBallIcon } from 'app.modules/assets/icons/ball/blackBall.svg';
import { ReactComponent as CameraIcon } from 'app.modules/assets/manageGoal/camera.svg';
import React from 'react';

function DetailGoal() {
	console.log('detail-goal');
	return (
		<div className="space-y-[3.2rem]">
			<div className="flex justify-between">
				<span className="pc:text-body7-pc">샐러드 챙겨먹기</span>
				<div className="w-[46.4rem] h-[9.5rem] flex flex-col justify-between">
					<p className="whitespace-pre-wrap h-[4.4rem] w-full truncate pc:text-body4-pc">
						사먹거나, 직접 만들어 먹거나 상관없이 기간 내 샐러드 챙겨먹기사먹거나, 직접 만들어 먹거나 상관없이 기간 내
						샐러드 챙겨먹기사먹거나, 직접 만들어 먹거나 상관없이 기간 내 샐러드 챙겨먹기사먹거나, 직접 만들어 먹거나
						상관없이 기간 내 샐러드 챙겨먹기사먹거나, 직접 만들어 먹거나 상관없이 기간 내 샐러드 챙겨먹기사먹거나, 직접
						만들어 먹거나 상관없이 기간 내 샐러드 챙겨먹기사먹거나, 직접 만들어 먹거나 상관없이 기간 내 샐러드 챙겨먹기
					</p>

					<div className="flex justify-between items-center">
						<div className="flex space-x-[0.8rem]">
							<Badge bgColor="bg-buttonGray-200">기타</Badge>
							<Badge bgColor="bg-buttonGray-200" className="pc:text-body2-pc flex items-center  space-x-[0.8rem] ">
								<div className="flex items-center space-x-[0.2rem]">
									<span>1000</span>

									<BlackBallIcon className="w-[1.8rem] h-[1.8rem] mt-[0.3rem]" />
								</div>
								<div className="w-[0.1rem] h-full bg-[#D3D3D3]" />
								<span>하이리스크</span>
							</Badge>
						</div>
						{/* TODO: 컴포넌트 만들기 */}
						<div className="pc:text-body2-pc">
							🗓 <span>D-25</span>
						</div>
					</div>
				</div>
			</div>

			<form className="space-y-[3.2rem]">
				<div className="flex justify-between items-start">
					<Badge bgColor="bg-buttonGray-200" className="text-[#828282] items-center  space-x-[1.6rem]">
						<span>12월 1일</span>
						<span className="bg-white rounded-[0.6rem] px-[0.6rem] py-[0.3rem] text-[1.2rem]">D-6</span>
					</Badge>
					<div className="flex flex-col space-y-[1.2rem]">
						<Label required htmlFor="certImage" content="인증 사진" className="text-[#828282]" />
						<label
							htmlFor="certImage"
							className="w-[46.4rem] h-[24.5rem] border-[0.1rem] border-[#E7E7E7] rounded-[0.8rem] grid place-content-center"
						>
							<div className="flex flex-col items-center">
								<CameraIcon />
								<span className="text-primaryBlack-300 pc:text-body1-pc">5일 후 등록할 수 있어요.</span>
							</div>
							<input id="certImage" disabled type="file" accept="image/*" className=" hidden" />
						</label>
					</div>
				</div>
				<div className="flex flex-col space-y-[1.2rem]">
					<Label required htmlFor="certContent" content="인증 내용" className="text-[#828282]" />
					<textarea
						id="certContent"
						placeholder="6일 후 인증 할 수 있어요."
						required
						readOnly
						name="content"
						onChange={() => null}
						className="resize-none w-full h-[9.4rem] outline-none  border-[0.1rem] rounded-[0.8rem] p-[2.4rem]"
					/>
				</div>
			</form>
			<Button variant="solid" size="lg" bgColor="bg-buttonGray-200">
				닫기
			</Button>
		</div>
	);
}

export default DetailGoal;
