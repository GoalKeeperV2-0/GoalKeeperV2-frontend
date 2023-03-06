import Label from 'app.components/App.base/Input/Label';
import { getDayDiff } from 'app.modules/utils/getDayDiff';
import React from 'react';
import { CertType } from '../types';

interface Props {
	todayString: string;
	certification: CertType | null;
	certDate: string;
	certContentHanlder: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	certContent: string;
}
function CertContent({ todayString, certification, certDate, certContent, certContentHanlder }: Props) {
	const getDday = () => {
		return getDayDiff(todayString, certDate);
	};
	const isJustRegister = getDday() > 0;
	return (
		<div className="flex flex-col space-y-[1.2rem]">
			<Label required htmlFor="certContent" content="인증 내용" className="text-[#828282]" />
			{getDday() >= 0 ? (
				<textarea
					id="certContent"
					placeholder={isJustRegister ? `${getDday()}일 후 인증 할 수 있어요.` : '인증내용을 작성해주세요.'}
					required
					disabled={isJustRegister}
					name="content"
					value={getDday() === 0 ? certContent : ''}
					onChange={certContentHanlder}
					className="resize-none w-full h-[9.4rem] outline-none  border-[0.1rem] rounded-[0.8rem] p-[2.4rem]"
				/>
			) : (
				<div className="resize-none w-full h-[9.4rem] outline-none  border-[0.1rem] rounded-[0.8rem] p-[2.4rem] truncate">
					{certification?.content}
				</div>
			)}
		</div>
	);
}

export default CertContent;
