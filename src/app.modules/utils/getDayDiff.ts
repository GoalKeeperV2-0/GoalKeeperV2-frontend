export const getDayDiff = (startDate: string, endDate: string) => {
	const date1Ms = new Date(startDate).getTime();
	const date2Ms = new Date(endDate).getTime();

	const differenceMs = date2Ms - date1Ms;

	return differenceMs / 1000 / 60 / 60 / 24;
};
