/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { SERVICE_URL } from 'app.modules/constants/ServiceUrl';
import { ReactComponent as ServiceLogo } from 'app.modules/assets/header/serviceLogo.svg';
import { ReactComponent as AlarmIcon } from 'app.modules/assets/header/alarm.svg';
import { ReactComponent as UserIcon } from 'app.modules/assets/header/user.svg';
import { ReactComponent as MenuIcon } from 'app.modules/assets/header/hamburger.svg';
import RouteModal from './Modal/RouteModal';
import SideMenu from './Sidemenu';
// import useDetectClose from 'hooks/useDetectClose';

type Menu = {
	title: string;
	path: string;
};

export default function Header() {
	const dropDownRef = useRef<HTMLImageElement>(null);
	// const [isOpen, setIsOpen] = useDetectClose(dropDownRef, [false, false]);
	const [isOpenSideMenu, setIsOpenSideMenu] = useState<boolean>(false);
	const MENU_LIST: Menu[] = [
		{
			title: '공지사항',
			path: SERVICE_URL.announcements,
		},
		{
			title: '목표인증',
			path: SERVICE_URL.certifications,
		},
		{
			title: '내정보',
			path: SERVICE_URL.myGoals,
		},
	];

	const handleClick = (e: React.MouseEvent<HTMLImageElement>, index: number) => {
		if (e.target === e.currentTarget) {
			/*	setIsOpen((current: boolean[]) => {
				const newIsOpen = current.map(() => false);
				newIsOpen[index] = !isOpen[index];
				return newIsOpen;
			});
            */
		}
	};

	const handleClickOfSideMenu = () => setIsOpenSideMenu(!isOpenSideMenu);

	return (
		<header className="w-full  h-[8.6rem] flex mx-auto  justify-between items-center">
			<div className="mr-[15.1rem] h-full flex items-center">
				<Link className="logo-link" to={SERVICE_URL.home}>
					<ServiceLogo className="pc:max-w-[15.7rem] max-w-[11.2rem]" />
				</Link>
			</div>
			<div className="flex items-center justify-between space-x-[53.5rem] ">
				<nav className="hidden pc:block ">
					<ul className="flex space-x-[35px]">
						{MENU_LIST.map((menu, index): React.ReactElement => {
							return (
								<li key={index} className="font-[600] pc:min-w-[65px]">
									<Link to={menu.path}>{menu.title}</Link>
								</li>
							);
						})}
					</ul>
				</nav>
				<div className="hidden  pc:flex space-x-[3.5rem] items-center  z-[1]" aria-hidden ref={dropDownRef}>
					<div className="relative">
						<AlarmIcon />
						<RouteModal title="알림" isOpen={false} setIsOpen={() => null} />
					</div>

					<div className="relative">
						<UserIcon />
						<RouteModal title="로그인 관리" isOpen={false} setIsOpen={() => null} />
					</div>
				</div>
			</div>

			<div className="block pc:hidden min-w-[16px] min-h-[12px] ">
				<button type="button" onClick={handleClickOfSideMenu} aria-label={isOpenSideMenu ? '메뉴 닫기' : '메뉴 열기'}>
					<MenuIcon />
				</button>
			</div>

			{isOpenSideMenu && <div aria-expanded={isOpenSideMenu} aria-hidden={isOpenSideMenu} />}
		</header>
	);
}
