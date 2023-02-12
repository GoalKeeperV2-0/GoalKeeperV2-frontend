import Label from 'app.components/App.base/Input/Label';
import TextInput from 'app.components/App.base/Input/TextInput';
import React from 'react';
import { ReactComponent as RedBallIcon } from 'app.modules/assets/icons/ball/redBall.svg';
import { ReactComponent as BlackBallIcon } from 'app.modules/assets/icons/ball/blackBall.svg';

interface Props {
	value: string;
	valueHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
// TODO: ErrorMessage Component 사용하기
function SetBallArea({ value, valueHandler }: Props) {
	return (
		<div className="space-y-[0.8rem]  w-full">
			<div className="space-y-[2.4rem]">
				<Label required htmlFor="point" content="포인트 설정" />
				<div className="flex items-center w-[32.3rem] space-x-[0.8rem] whitespace-nowrap">
					<TextInput
						id="point"
						name="point"
						value={value}
						onChange={valueHandler}
						type="text"
						placeholder="100"
						focusColor="primaryOrange-200"
						required
					/>
					<span className="text-body3-pc">00</span>
					<BlackBallIcon className="w-[2.2rem] h-[2.2rem]" />
				</div>
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
