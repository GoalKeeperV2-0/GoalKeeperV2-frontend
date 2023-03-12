import React from 'react';
interface Props {
	goalTypeText: '일반' | '지속';
	title: string;
}

function BottomText({ goalTypeText, title }: Props) {
	return (
		<div className="text-left flex flex-col space-y-[0.3rem]">
			<span className="pc:text-body1-pc text-primaryOrange-200">{goalTypeText}</span>
			<span className="pc:text-body6-pc truncate">{title}</span>
		</div>
	);
}

export default BottomText;
