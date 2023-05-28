import React from 'react';

interface Props {
	imgSrc: string;
	classNames?: string;
}

function BoxImage({ imgSrc, classNames }: Props) {
	return (
		<img
			alt=""
			src={imgSrc}
			className={`h-1/2 bg-buttonGray-200 pc:rounded-t-[1.5rem] w-full border-t-[0.1rem] border-x-[0.1rem]   border-borderGray    ${classNames}`}
		/>
	);
}

export default BoxImage;
