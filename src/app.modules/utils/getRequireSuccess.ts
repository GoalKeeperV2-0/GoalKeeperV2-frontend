export const getRequireSuccess = (point: number) => {
	// 볼은 100볼 단위
	if (point <= 100 && point <= 500) {
		return 5;
	}
	if (point <= 600 && point <= 1000) {
		return 10;
	}
	if (point <= 1100 && point <= 5000) {
		return 20;
	}
	return 30; // 5100~10000
};

export const getProgressText = (point: number, successCount: number) => {
	return `총 ${getRequireSuccess(point)}회 중 ${successCount}회 검증 완료`;
};
