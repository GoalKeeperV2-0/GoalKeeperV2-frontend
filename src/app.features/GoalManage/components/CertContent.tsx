import Label from 'app.components/App.base/Input/Label';
import { getDayDiff } from 'app.modules/utils/getDayDiff';
import React from 'react';
import { CertType } from '../types';

interface Props {
	todayString: string;
	focusedCert: CertType | null;
	certDate: string;
	onCertContentChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	certContent?: string;
}
function CertContent({ todayString, focusedCert, certDate, certContent, onCertContentChange }: Props) {
	const getDday = () => {
		return getDayDiff(todayString, certDate);
	};
	const isJustRegister = getDday() > 0;
	console.log(focusedCert, 'certContent');
	return (
		<div className="flex flex-col space-y-[1.2rem]">
			<Label required htmlFor="certContent" content="인증 내용" className="text-[#828282]" />
			{!focusedCert?.content ? (
				<textarea
					id="certContent"
					placeholder={isJustRegister ? `${getDday()}일 후 인증 할 수 있어요.` : '인증내용을 작성해주세요.'}
					required
					disabled={isJustRegister}
					name="content"
					value={getDday() === 0 ? certContent : ''}
					onChange={onCertContentChange}
					className="resize-none w-full h-[9.4rem] outline-none  border-[0.1rem] rounded-[0.8rem] p-[2.4rem]"
				/>
			) : (
				<div className="resize-none w-full h-[9.4rem] outline-none  border-[0.1rem] rounded-[0.8rem] p-[2.4rem] truncate">
					{focusedCert?.content}
				</div>
			)}
		</div>
	);
}

export default CertContent;
