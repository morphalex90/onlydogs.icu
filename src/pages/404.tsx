import Head from 'next/head';
import Layout from '@/components/Layout';

export default function page404() {
	return (
		<>
			<Head>
				<title>OnlyDogs</title>
				<meta name="description" content="OnlyDogs dogs" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Layout>
				<section className="section">
					<div className="section__container">
						<div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
							<div>
								No dogs found, please try again
							</div>
						</div>
					</div>
				</section>
			</Layout>
		</>
	)
}
