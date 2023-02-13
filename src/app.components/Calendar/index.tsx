import ArrowButton from 'app.components/Pagination/ArrowButton';
import { formatDate } from 'app.modules/utils/formatDate';
import React, { useEffect, useState } from 'react';
import { ReactComponent as ResetIcon } from 'app.modules/assets/icons/calendar/reset.svg';

const getKoreaToday = () => {
	const DATE = new Date(); // 현재 날짜(로컬 기준) 가져오기
	const utc = DATE.getTime() + DATE.getTimezoneOffset() * 60 * 1000; // utc 표준시 도출
	const kstGap = 9 * 60 * 60 * 1000; // 한국 kst 기준시간 더하기
	const today = new Date(utc + kstGap); // 한국 시간으로 date 객체 만들기(오늘)
	const year = today.getFullYear();
	const month = today.getMonth() + 1;
	const date = today.getDate();
	return {
		year,
		month,
		date,
	};
};

const getPrevMonthLastDayInfo = (curYear: number, curMonth: number) => {
	// getDay() -> 월요일이 1번
	// 이전 달의 마지막 날 날짜와 요일 구하기
	const lastDay = new Date(curYear, curMonth - 1, 0);
	const prevMonthLastDate = lastDay.getDate();
	const prevMonthLastDay = lastDay.getDay();
	return {
		prevMonthLastDate,
		prevMonthLastDay,
	};
};
const getCurMonthLastDayInfo = (curYear: number, curMonth: number) => {
	const lastDay = new Date(curYear, curMonth, 0);
	const curMonthLastDate = lastDay.getDate();
	const curMonthLastDay = lastDay.getDay();
	return {
		curMonthLastDate,
		curMonthLastDay,
	};
};
type DateStates = {
	prevMonthLastDay: number;
	prevMonthLastDate: number;
	curMonthLastDay: number;
	curMonthLastDate: number;
};
// TODO: 모바일 대응
interface Props {
	dateHandler: (dateType: 'startDate' | 'endDate', date: string) => void;
	startDate: string;
	endDate: string;
	certDates: string[];
	resetEndDateHandler: () => void;
	certDatesHandler: (date: string) => void;
}
function Calander({ dateHandler, endDate, startDate, certDates, resetEndDateHandler, certDatesHandler }: Props) {
	const { year, month, date } = getKoreaToday();
	const [searchMonth, setSearchMonth] = useState<number>(month);
	const [searchYear, setSearchYear] = useState<number>(year);
	const [lastDates, setLastDates] = useState<DateStates>({
		...getPrevMonthLastDayInfo(year, month),
		...getCurMonthLastDayInfo(year, month),
	});
	const changeMonth = (action: 'decrease' | 'increase') => {
		let newMonth;
		if (action === 'decrease') {
			newMonth = searchMonth - 1;
			if (newMonth === 0) {
				newMonth = 12;
				setSearchYear((prev) => prev - 1);
			}
		} else {
			newMonth = searchMonth + 1;
			if (newMonth === 13) {
				newMonth = 1;
				setSearchYear((prev) => prev + 1);
			}
		}
		setSearchMonth(newMonth);
	};
	const isTodayButton = (idx: number) => {
		return idx + 1 === date && searchYear === year && searchMonth === month;
	};
	const isEndDate = (idx: number) => {
		return (
			idx + 1 === +endDate.split('-')[2] &&
			+endDate.split('-')[0] === searchYear &&
			+endDate.split('-')[1] === searchMonth
		);
	};
	const isCertDate = (idx: number) => {
		return certDates.includes(formatDate(searchYear, searchMonth, idx + 1));
	};
	const isInTerm = (selectedDate: number) => {
		// TODO: 변수명 바꾸기
		const term = new Date(searchYear, searchMonth, selectedDate);
		const endDateYear = endDate.split('-')[0];
		const endDateMonth = endDate.split('-')[1];
		const endDateDate = endDate.split('-')[2];
		const today = new Date(year, month, date);

		return +selectedDate <= +endDateDate && searchMonth <= +endDateMonth && searchYear <= +endDateYear && term >= today;
	};

	const onDateButtonClick = (e: React.BaseSyntheticEvent) => {
		const {
			target: { value },
		} = e;
		if (endDate) {
			certDatesHandler(formatDate(searchYear, searchMonth, value));
			return;
		}
		//console.log(selectedYear, selectedMonth, selectedDate);
		const term = new Date(searchYear, searchMonth, value);
		const today = new Date(year, month, date);

		if (term < today) return;

		dateHandler('endDate', formatDate(searchYear, searchMonth, value));
	};
	useEffect(() => {
		const { prevMonthLastDay, prevMonthLastDate } = getPrevMonthLastDayInfo(searchYear, searchMonth);
		const { curMonthLastDay, curMonthLastDate } = getCurMonthLastDayInfo(searchYear, searchMonth);
		setLastDates({ prevMonthLastDay, prevMonthLastDate, curMonthLastDay, curMonthLastDate });
	}, [searchMonth]);
	useEffect(() => {
		dateHandler('startDate', formatDate(year, month, date));
	}, []);
	return (
		<div className="min-w-[32.7rem]  w-[32.7rem] h-[33rem] p-[2.2rem] space-y-[1.2rem] flex flex-col items-center border-[0.1rem] border-primaryBlack-100 rounded-[0.8rem] ">
			<div className="flex items-center justify-center space-x-[1.2rem] relative w-full">
				<button onClick={resetEndDateHandler} type="button" className="absolute left-0">
					<ResetIcon />
				</button>
				<ArrowButton direction="left" name="decrease-month" onClick={() => changeMonth('decrease')} disabled={false} />
				<div className="text-body5-mo pc:text-body5-pc whitespace-nowrap">
					{searchYear}년 {searchMonth}월
				</div>
				<ArrowButton direction="right" name="increase-month" onClick={() => changeMonth('increase')} disabled={false} />
			</div>
			<div className="w-full pc:text-body1-pc">
				<div className="grid grid-cols-7 text-center leading-[100%] ">
					{['일', '월', '화', '수', '목', '금', '토'].map((DAY, idx) => (
						<div key={idx} className="pc:text-body1-pc text-primaryBlack-300 h-[3.6rem] grid place-content-center">
							<span>{DAY}</span>
						</div>
					))}
				</div>
				<div className="grid grid-cols-7 text-center leading-[100%]">
					{lastDates.prevMonthLastDay !== 6 &&
						Array.from({ length: lastDates.prevMonthLastDay + 1 }).map((_, idx) => (
							<div key={idx} className=" text-primaryBlack-300 h-[3.6rem] grid place-content-center" />
						))}
					{Array.from({ length: lastDates.curMonthLastDate }).map((_, idx) => (
						<div
							key={idx}
							className={`${
								isInTerm(idx + 1) ? 'bg-primaryOrange-100 text-primaryOrange-200' : ''
							} min-h-[3.6rem] grid place-content-center`}
						>
							<button
								type="button"
								onClick={onDateButtonClick}
								value={idx + 1}
								className={`${
									isTodayButton(idx) && !isInTerm(idx + 1)
										? 'bg-primaryOrange-200 text-white rounded-[0.8rem] h-[2.6rem] w-[2.6rem]'
										: ''
								} ${isEndDate(idx) || isCertDate(idx) ? 'bg-[#FFE8CC]  rounded-[0.8rem] h-[2.6rem] w-[2.6rem]' : ''}`}
							>
								{idx + 1}
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default Calander;
