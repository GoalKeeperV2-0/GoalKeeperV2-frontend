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
	const [certImage, setCertImage] = useState<File>();
	const [certImagePreview, setCertImagePreview] = useState<string | null>('');
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
	const certImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const img = e.target?.files?.[0];
		if (!img) return;
		setCertImage(img);
		const reader = new FileReader();

		reader.readAsDataURL(img);
		reader.onloadend = () => {
			if (!reader?.result) return;
			setCertImagePreview(reader.result as string);
		};
	};
	const certContentHanlder = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setCertContent(e.target.value);
	};
	const certSubmitHandler = (e: React.FormEvent) => {
		e.preventDefault();
		if (isLoading) return;
		const goalType: 'oneTime' | 'manyTime' = isManyTimeGoal() ? 'manyTime' : 'oneTime';
		if (!goal?.id || !certContent.trim() || !certImage) return;
		const formData = new FormData();
		formData.append('goalType', goalType);
		formData.append('content', certContent);
		formData.append('picture', certImage);
		formData.append('goalId', `${goal.id}`);
		/*const body = {
			goalType,
			goalId: goal.id,
			content: certContent,
			picture: certImage,
		};*/
		console.log(formData.get('picture'), certImage);
		postCertMutate(formData);
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
						certImagePreview={certImagePreview as string}
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
