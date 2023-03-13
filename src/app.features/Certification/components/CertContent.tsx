import React from 'react';

interface Props {
	content: string;
}
function CertContent({ content }: Props) {
	return (
		<div className="flex flex-col space-y-[1.2rem]">
			<h2 className={`text-body5-mo pc:text-body5-pc `}>인증 내용</h2>
			{/* TODO: 입력 길어지는 경우 대응*/}

			<div className="resize-none w-full h-[9.4rem] outline-none  border-[0.1rem] rounded-[0.8rem] p-[2.4rem] overflow-hidden  whitespace-normal">
				<p>
					{content.substring(0, 86)}
					{content.length > 86 && '...'}
				</p>
			</div>
		</div>
	);
}

export default CertContent;
