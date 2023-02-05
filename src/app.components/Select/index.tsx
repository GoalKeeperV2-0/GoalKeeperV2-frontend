/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useRef, useEffect, BaseSyntheticEvent } from 'react';
import { ReactComponent as CaretIcon } from 'app.modules/assets/icons/caret.svg';
import { stopPropagation } from 'app.modules/utils/stopPropagation';

// export type DefaultValue = string | number | readonly string[] | undefined;

interface Props<T> {
	options: Map<string, string>;
	name: string;
	value: T | null;
	placeholder: string;
	// defaultValue: DefaultValue;
	onSelect: (e: React.BaseSyntheticEvent) => void;
}

export default function Select<T>({ options, name, value, onSelect, placeholder }: Props<T>) {
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

	const optionSelectHandler = (e: React.BaseSyntheticEvent) => {
		onSelect(e);
		setIsOpen(false);
	};

	return (
		<div className=" w-full relative ">
			<button
				className="relative w-full space-x-[1.6rem] p-[1.6rem] pc:p-[2.4rem] flex items-end rounded-[0.8rem] whitespace-nowrap  border-[0.1rem] border-primaryBlack-100"
				type="button"
				ref={optionRef}
				onClick={openOptionList}
			>
				<>
					<CaretIcon className="w-[1.0rem] pc:w-[1.6rem] arrow-icon-wrap" />

					<span className={`leading-[100%] ${value ? 'text-black' : 'text-primaryBlack-300'} `}>
						<>{options.get(value as string) || placeholder}</>
					</span>
				</>
			</button>
			{isOpen && (
				// eslint-disable-next-line jsx-a11y/click-events-have-key-events
				<div
					onClick={stopPropagation}
					className="absolute top-0 options py-[2.4rem] pl-[2.4rem] pr-[0.8rem]  w-full border-[0.1rem] border-primaryBlack-100 bg-primaryWhite rounded-[0.8rem]"
				>
					<button type="button" className=" w-full max-h-[16.2rem] overflow-y-auto scrollbar ">
						<ul className="text-body3-mo pc:text-body3-pc space-y-[1.2rem] pc:space-y-[2.4rem]">
							{Array.from(options.keys()).map((optionKey, index) => (
								<li
									key={index}
									className=" overflow-hidden  whitespace-nowrap text-ellipsis hover:text-primaryOrange-200"
								>
									<button
										value={optionKey}
										name={name}
										onClick={optionSelectHandler}
										className="w-full h-full text-left"
									>
										{options.get(optionKey)}
									</button>
								</li>
							))}
						</ul>
					</button>
				</div>
			)}
		</div>
	);
}
