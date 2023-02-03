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
		<div className="grid grid-cols-7">
			{Array.from({ length: prevMonthLastDay + 1 }).map((_, idx) => (
				<div key={idx} className="text-gray-500">
					{prevMonthLastDate - (prevMonthLastDay - idx)}
				</div>
			))}
			{Array.from({ length: curMonthLastDate }).map((_, idx) => (
				<div key={idx}>{idx + 1}</div>
			))}
			{Array.from({ length: 7 - curMonthLastDay - 1 }).map((_, idx) => (
				<div key={idx}>{idx + 1}</div>
			))}
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
