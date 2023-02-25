import { useMutation } from '@tanstack/react-query';
import Badge from 'app.components/App.base/Badge';
import Button from 'app.components/App.base/Button';
import { postCert } from 'app.modules/api/certification';
import { ReactComponent as BlackBallIcon } from 'app.modules/assets/icons/ball/blackBall.svg';
import { formatDate } from 'app.modules/utils/formatDate';
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
	const { mutate: postCertMutate, isLoading } = useMutation(postCert, {
		onSuccess: (res) => {
			console.log(res);

			alert('인증등록완료');
			//resetGoalForm();
		},
		onError: (error) => alert('오류 발생.'),
	});

	const goal: GoalDataType = MY_GOALS.filter((item) => item.id === id)[0] as unknown as GoalDataType;
	const { year, month, date } = getKoreaToday();
	const [certContent, setCertContent] = useState<string>('');
	const [certImage, setCertImage] = useState<string>(
		'data:image/jpeg;base64,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'
	);

	const todayString = formatDate(year, month, date);

	const [selectedCertIdx, setSelectedCertIdx] = useState<number>(0);
	// TODO:recoil로 이 상태들을 관리할까?
	const isManyTimeGoal = () => {
		return goal.certDates !== undefined;
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
	const certImageHandler = () => {};
	const certContentHanlder = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setCertContent(e.target.value);
	};
	const certSubmitHandler = (e: React.FormEvent) => {
		e.preventDefault();
		if (isLoading) return;
		const goalType: 'oneTime' | 'manyTime' = isManyTimeGoal() ? 'manyTime' : 'oneTime';
		if (!goal?.id || !certContent.trim() || !certImage) return;

		const body = {
			goalType,
			goalId: goal.id,
			content: certContent,
			picture: certImage,
		};
		console.log(body);
		postCertMutate(body);
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
								goalState: goal.goalState,
								endDate: goal.endDate,
								isManyTimeGoal: isManyTimeGoal(),
								certDates: goal.certDates,
								todayString,
							})}
						</div>
					</div>
				</div>
			</div>

			<form className="space-y-[3.2rem]" onSubmit={certSubmitHandler}>
				<div className="flex justify-between items-start">
					<CertDateList {...goal} todayString={`${todayString}`} selectCertHandler={selectCertHandler} />
					<CertImage
						todayString={todayString}
						certification={getCert()}
						certDate={(goal?.certDates ?? [goal.endDate])[selectedCertIdx]}
						certImageHandler={certImageHandler}
					/>
				</div>
				<CertContent
					todayString={todayString}
					certification={getCert()}
					certDate={(goal?.certDates ?? [goal.endDate])[selectedCertIdx]}
					certContentHanlder={certContentHanlder}
					certContent={certContent}
				/>
				<Button type="submit" variant="solid" size="lg" bgColor="bg-buttonGray-200">
					닫기
				</Button>
			</form>
		</div>
	);
}

export default DetailGoal;
