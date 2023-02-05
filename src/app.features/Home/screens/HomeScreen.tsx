import React from 'react';
import { ReactComponent as HomeBanner1 } from 'app.modules/assets/banners/home1.svg';
function HomeScreen() {
	return (
		<>
			<section className="">
				<HomeBanner1 />
			</section>
			<section className="mt-[3rem] space-y-[3rem]">
				<div className="flex  justify-between items-center">
					<h3>목표 인증</h3>
					<span className="pc:text-body6-pc text-primaryBlack-200">더보기</span>
				</div>
			</section>
		</>
	);
}

export default HomeScreen;
