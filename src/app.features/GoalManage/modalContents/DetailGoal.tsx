import Badge from 'app.components/App.base/Badge';
import Button from 'app.components/App.base/Button';
import Label from 'app.components/App.base/Input/Label';
import { ReactComponent as BlackBallIcon } from 'app.modules/assets/icons/ball/blackBall.svg';
import { formatDate } from 'app.modules/utils/formatDate';
import { getDayDiff } from 'app.modules/utils/getDayDiff';
import { getKoreaToday } from 'app.modules/utils/getKoreaToday';
import React, { useState } from 'react';
import CertContent from '../components/CertContent';
import CertDateList from '../components/CertDateList';
import CertImage from '../components/CertImage';
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

	const [selectedCertIdx, setSelectedCertIdx] = useState<number>(0);
	// TODO:recoil로 이 상태들을 관리할까?
	const isManyTimeGoal = () => {
		return goal.certDates !== undefined;
	};
	const isJustRegister = () => {
		if (isManyTimeGoal()) return goal.state === 'ONGOING' && getDayDiff(todayString, goal.certDates[0]) > 0;
		return goal.state === 'ONGOING' && getDayDiff(todayString, goal.endDate) > 0;
	};

	const selectCertHandler = (index: number) => {
		setSelectedCertIdx(index);
	};
	const getCert = () => {
		const cert = goal.certifications.filter(
			(item) => item.date === (goal.certDates ?? [goal.endDate])[selectedCertIdx]
		);

		if (cert.length) {
			return cert[0];
		}

		return null;
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
					<CertDateList {...goal} todayString={`${todayString}`} selectCertHandler={selectCertHandler} />
					<CertImage
						todayString={todayString}
						certification={getCert()}
						certDate={(goal?.certDates ?? [goal.endDate])[selectedCertIdx]}
					/>
				</div>
				<CertContent
					todayString={todayString}
					certification={getCert()}
					certDate={(goal?.certDates ?? [goal.endDate])[selectedCertIdx]}
				/>
			</form>
			<Button variant="solid" size="lg" bgColor="bg-buttonGray-200">
				닫기
			</Button>
		</div>
	);
}

export default DetailGoal;
