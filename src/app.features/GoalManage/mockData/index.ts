// 일반 목표
// 목표 등록
export const OneTimeOngoing = {
	id: 1,
	title: 'test',
	categoryType: 'STUDY',
	content: 'test',
	point: 100,
	reward: 'HIGH_RETURN',
	state: 'ONGOING',
	startDate: '2023-02-18',
	endDate: '2023-03-13',
	certification: null,
};

// 진행 중, 인증 디데이, 인증 등록 전
export const OneTimeOngoingDday = {
	id: 2,
	title: 'test2',
	categoryType: 'STUDY',
	content: 'test2test2',
	point: 200,
	reward: 'LOW_RETURN',
	state: 'ONGOING',
	startDate: '2023-02-09',
	endDate: '2023-02-21',
	certification: null,
};

// 진행 완료
export const OneTimeWaiting = {
	id: 3,
	title: 'test3',
	categoryType: 'STUDY',
	content: 'test3test3',
	point: 300,
	reward: 'LOW_RETURN',
	state: 'WAITING_CERT_COMPLETE',
	startDate: '2023-02-09',
	endDate: '2023-02-21',
	certification: {
		id: 1,
		content: 'ddd',
		picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI86f5U8eWxTGgKtSr5GHdWQ6xhU8pz4m8lA&usqp=CAU​',
		state: 'ONGOING',
		successCount: 1,
		failCount: 1,
	},
};

// 성공
export const OneTimeSuccess = {
	id: 4,
	title: 'test4',
	categoryType: 'STUDY',
	content: 'test4test4',
	point: 300,
	reward: 'HIGH_RETURN',
	state: 'SUCCESS',
	startDate: '2023-02-09',
	endDate: '2023-02-17',
	certification: {
		id: 2,
		content: 'GOOOD',
		picture: 'dddd',
		state: 'SUCCESS',
		successCount: 8,
		failCount: 1,
	},
};

// 실패

export const OneTimeFail = {
	id: 5,
	title: 'test5',
	categoryType: 'ETC',
	content: 'test5test5',
	point: 300,
	reward: 'HIGH_RETURN',
	state: 'FAIL',
	startDate: '2023-02-09',
	endDate: '2023-02-17',
	certification: {
		id: 3,
		content: 'BAAAAD',
		picture: 'dddd',
		state: 'FAIL',
		successCount: 1,
		failCount: 8,
	},
};

// 검토요청
export const OneTimeHold = {
	id: 6,
	title: 'test5',
	categoryType: 'ETC',
	content: 'test6test6',
	point: 300,
	reward: 'HIGH_RETURN',
	state: 'HOLD',
	startDate: '2023-02-09',
	endDate: '2023-02-17',
	certification: {
		id: 4,
		content: 'HOOOOLD',
		picture: 'dddddd',
		state: 'FAIL',
		successCount: 1,
		failCount: 8,
	},
};

// 지속 목표

// 목표 등록
export const ManyTimeOngoing = {
	id: 7,
	title: '꾸준히하는 목표',
	categoryType: 'STUDY',
	content: 'dd',
	point: 100,
	reward: 'HIGH_RETURN',
	state: 'ONGOING',
	startDate: '2023-02-18',
	endDate: '2023-03-23',
	certDates: ['2023-03-09', '2023-03-11', '2023-03-12', '2023-03-23'],
	certifications: [],
};

// 진행 중, 인증 없는 상태, 인증일
export const ManyTimeDday = {
	id: 8,
	title: '꾸준히하는 목표2',
	categoryType: 'STUDY',
	content: 'dddd',
	point: 100,
	reward: 'HIGH_RETURN',
	state: 'ONGOING',
	startDate: '2023-01-17',
	endDate: '2023-03-18',
	certDates: ['2023-02-21', '2023-02-22', '2023-02-25', '2023-03-18'],
	certifications: [],
};

// 진행 중 , 인증 1개 있는 상태
export const ManyTimeOngoing2 = {
	id: 9,
	title: '꾸준히하는 목표3',
	categoryType: 'STUDY',
	content: 'dddd',
	point: 100,
	reward: 'HIGH_RETURN',
	state: 'ONGOING',
	startDate: '2023-01-17',
	endDate: '2023-03-18',
	certDates: ['2023-01-18', '2023-01-19', '2023-02-20', '2023-02-22', '2023-03-18'],
	certifications: [
		{
			id: 5,
			content: '지속 인증 글',
			picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoAEssp5xBCP420VJTAkFru3VTpDnHVnXzjg&usqp=CAU',
			state: 'SUCCESS',
			date: '2023-02-19',
			successCount: 1,
			failCount: 1,
		},
		{
			id: 5,
			content: '지속 인증 글',
			picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoAEssp5xBCP420VJTAkFru3VTpDnHVnXzjg&usqp=CAU',
			state: 'FAIL',
			date: '2023-02-20',
			successCount: 1,
			failCount: 1,
		},
	],
};

// 진행 완료, 결과 기다리는 중
export const ManyTimeWaiting = {
	id: 10,
	title: '꾸준히하는 기다림',
	categoryType: 'STUDY',
	content: 'dddd',
	point: 100,
	reward: 'HIGH_RETURN',
	state: 'WAITING_CERT_COMPLETE',
	startDate: '2023-01-17',
	endDate: '2023-02-21',
	certDates: ['2023-01-17', '2023-01-18', '2023-01-19', '2023-02-21'],
	certifications: [
		{
			id: 6,
			content: '지속 인증 글',
			picture: 'dddddd',
			state: 'SUCCESS',
			date: '2023-01-17',
			successCount: 1,
			failCount: 1,
		},
		{
			id: 7,
			content: '지속 인증 글',
			picture: 'dddddd',
			state: 'SUCCESS',
			date: '2023-01-18',
			successCount: 1,
			failCount: 1,
		},
		{
			id: 8,
			content: '지속 인증 글',
			picture: 'dddddd',
			state: 'SUCCESS',
			date: '2023-01-19',
			successCount: 1,
			failCount: 1,
		},
		{
			id: 9,
			content: '지속 인증 글',
			picture:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWAFVzacOJiaWFv-AFwrhuosAaLm8zqn4GLo8V5EUvcUL6nit1GSMC8PVvB3zPqipp5Js&usqp=CAU',
			state: 'ONGOING',
			date: '2023-02-21',
			successCount: 1,
			failCount: 1,
		},
	],
};

// 성공
export const ManyTimeSuccess = {
	id: 11,
	title: '꾸준히 성공한 목표',
	categoryType: 'STUDY',
	content: 'dd',
	point: 100,
	reward: 'HIGH_RETURN',
	state: 'SUCCESS',
	startDate: '2023-01-01',
	endDate: '2023-02-17',
	certDates: ['2023-01-01', '2023-01-02', '2023-01-03', '2023-02-17'],
	certifications: [
		{
			id: 10,
			content: '지속 인증 글',
			picture: 'dddddd',
			state: 'SUCCESS',
			date: '2023-01-01',
			successCount: 1,
			failCount: 1,
		},
		{
			id: 11,
			content: '지속 인증 글',
			picture: 'dddddd',
			state: 'SUCCESS',
			date: '2023-01-02',
			successCount: 1,
			failCount: 1,
		},
		{
			id: 12,
			content: '지속 인증 글',
			picture: 'dddddd',
			state: 'SUCCESS',
			date: '2023-01-03',
			successCount: 1,
			failCount: 1,
		},
		{
			id: 13,
			content: '지속 인증 글',
			picture: 'dddddd',
			state: 'SUCCESS',
			date: '2023-02-17',
			successCount: 1,
			failCount: 1,
		},
	],
};

// 실패
export const ManyTimeFail = {
	id: 12,
	title: '꾸준히 실패한 목표',
	categoryType: 'STUDY',
	content: 'dd',
	point: 100,
	reward: 'HIGH_RETURN',
	state: 'FAIL',
	startDate: '2023-01-01',
	endDate: '2023-02-17',
	certDates: ['2023-01-01', '2023-01-02', '2023-01-03', '2023-02-17'],
	certifications: [
		{
			id: 14,
			content: '지속 인증 글',
			picture: 'dddddd',
			state: 'FAIL',
			date: '2023-01-01',
			successCount: 1,
			failCount: 1,
		},
		{
			id: 15,
			content: '지속 인증 글',
			picture: 'dddddd',
			state: 'FAIL',
			date: '2023-01-02',
			successCount: 1,
			failCount: 1,
		},
		{
			id: 16,
			content: '지속 인증 글',
			picture: 'dddddd',
			state: 'FAIL',
			date: '2023-01-03',
			successCount: 1,
			failCount: 1,
		},
		{
			id: 17,
			content: '지속 인증 글',
			picture: 'dddddd',
			state: 'FAIL',
			date: '2023-02-17',
			successCount: 1,
			failCount: 1,
		},
	],
};

// 검토요청
export const ManyTimeHold = {
	id: 13,
	title: '꾸준히 검증한 목표',
	categoryType: 'STUDY',
	content: 'dd',
	point: 100,
	reward: 'HIGH_RETURN',
	state: 'HOLD',
	startDate: '2023-01-01',
	endDate: '2023-02-17',
	certDates: ['2023-01-01', '2023-01-02', '2023-01-03', '2023-02-17'],
	certifications: [
		{
			id: 15,
			content: '지속 인증 글',
			picture: 'dddddd',
			state: 'FAIL',
			date: '2023-01-01',
			successCount: 1,
			failCount: 1,
		},
		{
			id: 16,
			content: '지속 인증 글',
			picture: 'dddddd',
			state: 'FAIL',
			date: '2023-01-02',
			successCount: 1,
			failCount: 1,
		},
		{
			id: 17,
			content: '지속 인증 글',
			picture: 'dddddd',
			state: 'FAIL',
			date: '2023-01-03',
			successCount: 1,
			failCount: 1,
		},
		{
			id: 18,
			content: '지속 인증 글',
			picture: 'dddddd',
			state: 'FAIL',
			date: '2023-02-17',
			successCount: 1,
			failCount: 1,
		},
	],
};

export const MY_GOALS = [
	{ ...OneTimeOngoing },
	{ ...OneTimeOngoingDday },
	{ ...OneTimeWaiting },
	{ ...OneTimeSuccess },
	{ ...OneTimeFail },
	{ ...OneTimeHold },
	{ ...ManyTimeOngoing },
	{ ...ManyTimeDday },
	{ ...ManyTimeOngoing2 },
	{ ...ManyTimeWaiting },
	{ ...ManyTimeSuccess },
	{ ...ManyTimeFail },
	{ ...ManyTimeHold },
];
