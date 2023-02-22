import Badge from 'app.components/App.base/Badge';
import Button from 'app.components/App.base/Button';
import Label from 'app.components/App.base/Input/Label';
import { ReactComponent as BlackBallIcon } from 'app.modules/assets/icons/ball/blackBall.svg';
import { ReactComponent as CameraIcon } from 'app.modules/assets/manageGoal/camera.svg';
import { formatDate } from 'app.modules/utils/formatDate';
import { getKoreaToday } from 'app.modules/utils/getKoreaToday';
import React from 'react';
import { MY_GOALS } from '../mockData';
import { CategoryType, GoalDataType, MappedCategory, MappedReward, RewardType } from '../types';
import { getDdayMessage } from '../utils/getDdayMessage';

interface Props {
	id: number;
}

function DetailGoal({ id }: Props) {
	console.log('detail-goal');
	const goal: GoalDataType = MY_GOALS.filter((item) => item.id === id)[0] as unknown as GoalDataType;
	const { year, month, date } = getKoreaToday();
	const todayString = formatDate(year, month, date);
	console.log(goal);
	const isManyTimeGoal = () => {
		return goal.certDates !== undefined;
	};
	return (
		<div className="space-y-[3.2rem]">
			<div className="flex justify-between">
				<span className="pc:text-body7-pc">{goal.title}</span>
				<div className="w-[46.4rem] h-[9.5rem] flex flex-col justify-between">
					<p className="whitespace-pre-wrap h-[4.4rem] w-full truncate pc:text-body4-pc">{goal.content}</p>

					<div className="flex justify-between items-center">
						<div className="flex space-x-[0.8rem]">
							<Badge bgColor="bg-buttonGray-200">{MappedCategory[goal.categoryType as CategoryType]}</Badge>
							<Badge bgColor="bg-buttonGray-200" className="pc:text-body2-pc flex items-center  space-x-[0.8rem] ">
								<div className="flex items-center space-x-[0.2rem]">
									<span>{goal.point}</span>

									<BlackBallIcon className="w-[1.8rem] h-[1.8rem] mt-[0.3rem]" />
								</div>
								<div className="w-[0.1rem] h-full bg-[#D3D3D3]" />
								<span>{MappedReward[goal?.reward as RewardType]}</span>
							</Badge>
						</div>
						{/* TODO: 컴포넌트 만들기 */}
						<div className="pc:text-body2-pc">
							🗓{' '}
							{getDdayMessage({
								state: goal.state,
								endDate: goal.endDate,
								isManyTimeGoal: isManyTimeGoal(),
								certDates: goal.certDates,
								todayString,
							})}
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
