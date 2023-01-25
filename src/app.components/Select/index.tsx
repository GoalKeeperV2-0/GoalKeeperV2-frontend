import React, { useState, useRef, MouseEvent, useEffect, BaseSyntheticEvent, useMemo } from 'react';
// import { ReactComponent as Polygon } from 'assets/icons/polygon.svg';

// export type DefaultValue = string | number | readonly string[] | undefined;

interface SelectProps {
	options: string[];
	value: string | null;
	// defaultValue: DefaultValue;
	onChange: (curVar: string) => void;
}
// export default function Select({ options, value, defaultValue, onChange }: SelectProps) {
export default function Select({ options, value, onChange }: SelectProps) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const optionRef = useRef<HTMLDivElement>(null);

	const optionListPC = useMemo(
		() =>
			options.map((option, index) => (
				<li
					key={index}
					className=" overflow-hidden text-left whitespace-nowrap text-ellipsis hover:text-primaryOrange-200"
				>
					{option}
				</li>
			)),
		[options]
	);

	// const optionListMobile = useMemo(
	// 	() =>
	// 		options.map((option: Option) => (
	// 			<option
	// 				key={option.id}
	// 				value={option.value}
	// 				onChange={(e: React.BaseSyntheticEvent | MouseEvent) => onChange(e.target.innerText)}
	// 			>
	// 				{option.value}
	// 			</option>
	// 		)),
	// 	[onChange, options]
	// );

	// isOpen 이 변경이 되면 return 된 함수가 실행이 된다.
	const onClick = (e: Event | BaseSyntheticEvent) => {
		if (optionRef !== null && !optionRef.current?.contains(e.target)) {
			setIsOpen(false);
		}
	};
	useEffect(() => {
		if (isOpen) window.addEventListener('click', onClick);
		return () => window.removeEventListener('click', onClick);
	}, [isOpen]);

	const handleClick = () => {
		setIsOpen(!isOpen);
	};

	const handleMouseDown = (e: React.BaseSyntheticEvent | MouseEvent) => {
		console.log('hello');
		console.log(e.target.dataset.id);
		const { id } = e.target.dataset;
		if (id === 'wrap-button') return;

		setIsOpen(false);
		onChange(e.target.innerText);
	};
	useEffect(() => {
		console.log(isOpen);
	}, [isOpen]);
	return (
		<div className=" w-full relative">
			<div className="relative w-full" ref={optionRef}>
				<button
					type="button"
					className="select w-full pc:h-[70px] h-[46px] pc:border-2 border-[1px] border-primaryBlack-100 rounded-xl "
					onClick={handleClick}
				>
					<span className="arrow-icon-wrap">{/* <Polygon className="max-w-[13px] max-h-[13px]" /> */}</span>
					<span className="selected w-full pl-[16px] whitespace-nowrap text-ellipsis overflow-hidden text-left flex items-center pc:leading-[70px] leading-[46px]">
						{/* {!value ? defaultValue : value} */}
						{value}
					</span>
				</button>
			</div>
			{options && (
				<div
					className={`absolute top-0 options py-[2.4rem] pl-[2.4rem] pr-[0.8rem]  w-full pc:border-2 border-[1px] border-primaryBlack-100 bg-primaryWhite rounded-xl  ${
						isOpen ? '' : 'hidden'
					} z-50`}
				>
					<button
						type="button"
						className=" w-full max-h-[162px] h-[162px] overflow-y-auto scrollbar "
						data-id="wrap-button"
						onMouseDown={handleMouseDown}
					>
						<ul className="text-body3-mo pc:text-body3-pc space-y-[1.2rem] pc:space-y-[2.4rem]">{optionListPC}</ul>
					</button>
				</div>
			)}
		</div>
	);
}
