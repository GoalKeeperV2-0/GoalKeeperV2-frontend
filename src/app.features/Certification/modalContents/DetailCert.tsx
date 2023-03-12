import Badge from 'app.components/App.base/Badge';
import Button from 'app.components/App.base/Button';
import CertContent from 'app.features/GoalManage/components/CertContent';
import CertDateList from 'app.features/GoalManage/components/CertDateList';
import CertImage from 'app.features/GoalManage/components/CertImage';
import { CategoryType, GoalDataType, GoalStateType, MappedCategory } from 'app.features/GoalManage/types';
import { getDdayMessage } from 'app.features/GoalManage/utils/getDdayMessage';
import { formatDate } from 'app.modules/utils/formatDate';
import { getKoreaToday } from 'app.modules/utils/getKoreaToday';
import React, { useState } from 'react';
import { CertDataType } from '../types';

interface Props {
	certData: CertDataType; // TODO:  goalData 빼기
	goal: GoalDataType;
	dday: number;
	onCloseModal: () => void;
}

function DetailCert({ certData, goal, dday, onCloseModal }: Props) {
	console.log('detail-cert');
	/*const { mutate: postCertMutate, isLoading } = useMutation(postCert, {
		onSuccess: (res) => {
			console.log(res);

			alert('인증등록완료');
			//resetGoalForm();
		},
		onError: (error) => alert('오류 발생.'),
	});*/

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
	const getFocusedCert = () => {
		const cert = goal.certifications?.filter(
			(item) => item.date === (goal.certDates ?? [goal.endDate])[selectedCertIdx]
		);

		if (cert?.length) {
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
	const judgeSubmitHandler = () => {
		console.log('제출');
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
						</div>
						{/* TODO: 컴포넌트 만들기 */}
						<div className="pc:text-body2-pc">⏰ D-{dday}</div>
					</div>
				</div>
			</div>

			<form className="space-y-[3.2rem]" onSubmit={judgeSubmitHandler}>
				<div className="flex justify-between items-start">
					<CertDateList {...goal} todayString={`${todayString}`} onSelectCert={selectCertHandler} />
					<CertImage
						todayString={todayString}
						certification={getFocusedCert()}
						certDate={(goal?.certDates ?? [goal.endDate])[selectedCertIdx]}
						onCertImageChange={certImageHandler}
						certImagePreview={certImagePreview as string}
						isCertModal
					/>
				</div>
				<CertContent
					todayString={todayString}
					focusedCert={getFocusedCert()}
					certDate={(goal?.certDates ?? [goal.endDate])[selectedCertIdx]}
					onCertContentChange={certContentHanlder}
					certContent={certContent}
				/>
				<div className="flex w-full space-x-[1.6rem]">
					<Button onClick={() => onCloseModal()} type="button" variant="solid" size="lg" bgColor="bg-buttonGray-200">
						닫기
					</Button>
					<div className="flex space-x-[0.8rem] min-w-[46.2rem]">
						<Button type="submit" variant="solid" size="lg" bgColor="bg-buttonGray-300" textColor="text-buttonGray-400">
							실패
						</Button>
						<Button type="submit" variant="solid" size="lg" bgColor="bg-primaryOrange-200" textColor="text-white">
							닫기
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default DetailCert;
