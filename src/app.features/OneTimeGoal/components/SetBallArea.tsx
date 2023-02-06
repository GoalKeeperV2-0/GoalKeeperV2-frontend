import Label from 'app.components/App.base/Input/Label';
import TextInput from 'app.components/App.base/Input/TextInput';
import React from 'react';
import { ReactComponent as RedBallIcon } from 'app.modules/assets/icons/ball/redBall.svg';
// TODO: ErrorMessage Component 사용하기
function SetBallArea() {
	return (
		<div className="space-y-[0.8rem]  w-full">
			<div className="space-y-[2.4rem]">
				<Label required htmlFor="ball" content="포인트 설정" />
				<TextInput id="ball" name="ball" type="text" placeholder="100" focusColor="primaryOrange-200" required />
			</div>
			<div className="mt-[10.6rem] flex items-center text-buttonRed-200 text-[1.4rem] font-semibold">
				<span>*포인트는 100</span>
				<RedBallIcon />
				<span>부터 10,000</span>
				<RedBallIcon />
				<span>까지 선택할 수 있어요.</span>
			</div>
		</div>
	);
}

export default SetBallArea;
