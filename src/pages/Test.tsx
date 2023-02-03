import ArrowButton from 'app.components/Pagination/ArrowButton';
import React, { useEffect } from 'react';

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
function Calander() {
	const { year, month, day } = getKoreaToday();
	const { prevMonthLastDay, prevMonthLastDate } = getPrevMonthLastDayInfo(year, month);
	const { curMonthLastDay, curMonthLastDate } = getCurMonthLastDayInfo(year, month);
	return (
		<div className="w-[32.7rem] h-[31.6rem] p-[2.2rem] space-y-[2.2rem] flex flex-col items-center border-[0.1rem] border-primaryBlack-100 rounded-[0.8rem] ">
			<div className="flex items-center space-x-[1.2rem]">
				<ArrowButton direction="left" onClick={() => null} disabled={false} />
				<span className="text-body5-mo pc:text-body5-pc">
					{year}년 {month}월
				</span>
				<ArrowButton direction="right" onClick={() => null} disabled={false} />
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
					{Array.from({ length: prevMonthLastDay + 1 }).map((_, idx) => (
						<div key={idx} className="text-primaryBlack-300 h-[3.6rem]">
							<button>{prevMonthLastDate - (prevMonthLastDay - idx)}</button>
						</div>
					))}
					{Array.from({ length: curMonthLastDate }).map((_, idx) => (
						<div key={idx} className="h-[3.6rem]">
							<button>{idx + 1}</button>
						</div>
					))}
					{Array.from({ length: 7 - curMonthLastDay - 1 }).map((_, idx) => (
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
			<Calander />
		</div>
	);
}

export default Test;
