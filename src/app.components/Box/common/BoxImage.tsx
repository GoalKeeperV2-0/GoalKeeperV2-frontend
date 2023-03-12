import React from 'react';

interface Props {
	bgUrl: string;
}

function BoxImage({ bgUrl }: Props) {
	return (
		<div
			className="h-1/2 bg-buttonGray-200 pc:rounded-t-[1.5rem] bg-cover "
			style={{ backgroundImage: `url(${bgUrl})` }}
		/>
	);
}

export default BoxImage;
