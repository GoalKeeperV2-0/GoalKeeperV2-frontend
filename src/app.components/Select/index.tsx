/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useRef, useEffect, BaseSyntheticEvent } from 'react';
import { ReactComponent as CaretIcon } from 'app.modules/assets/icons/caret.svg';

// export type DefaultValue = string | number | readonly string[] | undefined;

interface Props {
	options: string[];
	value: string | null;
	placeholder: string;
	// defaultValue: DefaultValue;
	onChange: (curVar: string) => void;
}

export default function Select({ options, value, onChange, placeholder }: Props) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const optionRef = useRef<HTMLButtonElement>(null);

	// isOpen 이 변경이 되면 return 된 함수가 실행이 된다.
	const closeOptionList = (e: Event | BaseSyntheticEvent) => {
		if (optionRef !== null && !optionRef.current?.contains(e.target)) {
			setIsOpen(false);
		}
	};
	useEffect(() => {
		if (isOpen) window.addEventListener('click', closeOptionList);
		return () => window.removeEventListener('click', closeOptionList);
	}, [isOpen]);

	const openOptionList = () => {
		setIsOpen(true);
	};
	const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
	};

	return (
		<div className=" w-full relative ">
			<button
				className="relative w-full space-x-[1.6rem] p-[1.6rem] pc:p-[2.4rem] flex items-end rounded-[0.8rem] whitespace-nowrap  border-[0.1rem] border-primaryBlack-100"
				type="button"
				ref={optionRef}
				onClick={openOptionList}
			>
				<CaretIcon className="w-[1.0rem] pc:w-[1.6rem] arrow-icon-wrap" />

				<span className="leading-[100%] text-primaryBlack-300">{placeholder}</span>
			</button>
			{isOpen && (
				// eslint-disable-next-line jsx-a11y/click-events-have-key-events
				<div
					onClick={stopPropagation}
					className="absolute top-0 options py-[2.4rem] pl-[2.4rem] pr-[0.8rem]  w-full border-[0.1rem] border-primaryBlack-100 bg-primaryWhite rounded-[0.8rem]"
				>
					<button type="button" className=" w-full max-h-[16.2rem] overflow-y-auto scrollbar ">
						<ul className="text-body3-mo pc:text-body3-pc space-y-[1.2rem] pc:space-y-[2.4rem]">
							{options.map((option, index) => (
								// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
								<li
									key={index}
									onClick={() => setIsOpen(false)}
									className=" overflow-hidden text-left whitespace-nowrap text-ellipsis hover:text-primaryOrange-200"
								>
									{option}
								</li>
							))}
						</ul>
					</button>
				</div>
			)}
		</div>
	);
}
