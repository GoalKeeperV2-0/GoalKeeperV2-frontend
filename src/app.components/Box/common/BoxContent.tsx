import React from 'react';
interface Props {
	content: string;
}
function BoxContent({ content }: Props) {
	return (
		<p className="h-[4.4rem] w-full  pc:text-body4-pc overflow-hidden  whitespace-normal">
			{content.slice(0, 56)}
			{content.length > 56 && '...'}
		</p>
	);
}

export default BoxContent;
