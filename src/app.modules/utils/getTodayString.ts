import { formatDate } from './formatDate';
import { getKoreaToday } from './getKoreaToday';

export const getTodayString = () => {
	const { year, month, date } = getKoreaToday();
	return formatDate(year, month, date);
};
