import React from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';
import Cats from '@/components/Cats';

export default function Home() {
	return (
		<>
			<Head>
				<link rel="canonical" href="https://onlydogs.icu" />
				<title>OnlyDogs</title>
				<meta name="description" content="Do you need dogs? Are you having a bad day? Here you can find all the dogs you need" />

				<meta property="og:type" content="website" />
				<meta property="og:title" content="OnlyDogs" />
				<meta property="og:description" content="Do you need dogs? Are you having a bad day? Here you can find all the dogs you need" />
				<meta property="og:url" content="https://onlydogs.icu" />
			</Head>
			<Layout>
				<section className="section">
					<div className="section__container">
						<Cats />
					</div>
				</section>

			</Layout>
		</>
	)
}
