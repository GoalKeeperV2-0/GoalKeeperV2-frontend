import ArrowButton from 'app.components/Pagination/ArrowButton';
import React, { useEffect, useState } from 'react';

const getKoreaToday = () => {
	const date = new Date(); // 현재 날짜(로컬 기준) 가져오기
	const utc = date.getTime() + date.getTimezoneOffset() * 60 * 1000; // utc 표준시 도출
	const kstGap = 9 * 60 * 60 * 1000; // 한국 kst 기준시간 더하기
	const today = new Date(utc + kstGap); // 한국 시간으로 date 객체 만들기(오늘)
	const year = today.getFullYear();
	const month = today.getMonth() + 1;
	const day = today.getDate();
	return {
		year,
		month,
		day,
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
function Calander() {
	const { year, month, day } = getKoreaToday();
	const [searchMonth, setSearchMonth] = useState<number>(month);
	const [searchYear, setSearchYear] = useState<number>(year);
	const [lastDates, setLastDates] = useState<DateStates>({
		...getPrevMonthLastDayInfo(year, month),
		...getCurMonthLastDayInfo(year, month),
	});
	const changeMonth = (e: React.BaseSyntheticEvent) => {
		let newMonth;
		console.log(e.target.name);
		if (e.target.name === 'decrease-month') {
			newMonth = searchMonth - 1;
			console.log('d', newMonth, month);
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
		console.log(newMonth);
		setSearchMonth(newMonth);
	};
	useEffect(() => {
		const { prevMonthLastDay, prevMonthLastDate } = getPrevMonthLastDayInfo(searchYear, searchMonth);
		const { curMonthLastDay, curMonthLastDate } = getCurMonthLastDayInfo(searchYear, searchMonth);
		setLastDates({ prevMonthLastDay, prevMonthLastDate, curMonthLastDay, curMonthLastDate });
	}, [searchMonth]);
	return (
		<div className="w-[32.7rem] h-[34rem] p-[2.2rem] space-y-[2.2rem] flex flex-col items-center border-[0.1rem] border-primaryBlack-100 rounded-[0.8rem] ">
			<div className="flex items-center space-x-[1.2rem]">
				<ArrowButton direction="left" name="decrease-month" onClick={changeMonth} disabled={false} />
				<div className="text-body5-mo pc:text-body5-pc">
					{searchYear}년 {searchMonth}월
				</div>
				<ArrowButton direction="right" name="increase-month" onClick={changeMonth} disabled={false} />
			</div>
			<div className="w-full pc:text-body1-pc">
				<div className="grid grid-cols-7 text-center leading-[100%]">
					{['일', '월', '화', '수', '목', '금', '토'].map((DAY, idx) => (
						<div key={idx} className="pc:text-body1-pc text-primaryBlack-300 h-[3.6rem]">
							<span>{DAY}</span>
						</div>
					))}
				</div>
				<div className="grid grid-cols-7 text-center leading-[100%]">
					{lastDates.prevMonthLastDay !== 6 &&
						Array.from({ length: lastDates.prevMonthLastDay + 1 }).map((_, idx) => (
							<div key={idx} className="text-primaryBlack-300 h-[3.6rem]">
								<button>{lastDates.prevMonthLastDate - (lastDates.prevMonthLastDay - idx)}</button>
							</div>
						))}
					{Array.from({ length: lastDates.curMonthLastDate }).map((_, idx) => (
						<div key={idx} className="h-[3.6rem]">
							<button>{idx + 1}</button>
						</div>
					))}
					{lastDates.curMonthLastDay !== 6 &&
						Array.from({ length: 7 - lastDates.curMonthLastDay - 1 }).map((_, idx) => (
							<div key={idx} className="text-primaryBlack-300 h-[3.6rem]">
								<button>{idx + 1}</button>
							</div>
						))}
				</div>
			</div>
		</div>
	);
}

function Test() {
	const { year, month, day } = getKoreaToday();
	const { prevMonthLastDate, prevMonthLastDay } = getPrevMonthLastDayInfo(year, month);
	const { curMonthLastDate, curMonthLastDay } = getCurMonthLastDayInfo(year, month);
	return (
		<div>
			<a href="tel:010-5132-3070" className="  p-[0.8rem] bg-g4 aria-disabled:bg-g1 rounded-[0.8rem]">
				전화걸기
			</a>
		</div>
	);
}

export default Test;
