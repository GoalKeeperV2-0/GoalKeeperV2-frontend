import React from 'react';

interface Props {
	bgUrl: string;
}

function BoxImage({ bgUrl }: Props) {
	return <div className={`h-1/2 bg-buttonGray-200 pc:rounded-t-[1rem] bg-cover ${bgUrl}`} />;
}

export default BoxImage;
