import React from 'react';
import { ReactComponent as HomeBanner1 } from 'app.modules/assets/banners/home1.svg';
import { Link } from 'react-router-dom';
import { SERVICE_URL } from 'app.modules/constants/ServiceUrl';
import { CertDataType } from 'app.features/Certification/types';
import CertBox from 'app.components/Box/CertBox';
interface Props {
	certs: CertDataType[];
}
function HomeScreen({ certs }: Props) {
	return (
		<>
			<section className="">
				<HomeBanner1 />
			</section>
			<section className="mt-[3rem] space-y-[3rem]">
				<div className="flex  justify-between items-center">
					<h3>목표 인증</h3>
					<Link to={SERVICE_URL.certifications}>
						<span className="pc:text-body6-pc text-primaryBlack-200">더보기</span>
					</Link>
				</div>
				<ul className="grid grid-cols-3 gap-[3rem]">
					{certs?.map((cert, index) => (
						<li key={index}>
							<CertBox certData={cert} />
						</li>
					))}
				</ul>
			</section>
		</>
	);
}

export default HomeScreen;
