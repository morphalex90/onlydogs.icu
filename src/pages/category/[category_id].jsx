import React from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';
import Cats from '@/components/Cats';
import { useRouter } from 'next/router';

export default function Category() {
    const router = useRouter();

    return (
        <>
            <Head>
                <link rel="canonical" href={"https://onlydogs.icu/category/" + (router.isReady ? router.query.category_id : '')} />
                <title>OnlyDogs Category {router.isReady ? router.query.category_id : ''}</title>
                <meta name="description" content="Do you need dogs? Are you having a bad day? Here you can find all the dogs you need" />

                <meta property="og:type" content="website" />
                <meta property="og:title" content={"OnlyDogs Category " + (router.isReady ? router.query.category_id : '')} />
                <meta property="og:description" content="Do you need dogs? Are you having a bad day? Here you can find all the dogs you need" />
                <meta property="og:url" content={"https://onlydogs.icu/category/" + (router.isReady ? router.query.category_id : '')} />
            </Head>
            <Layout>
                <section className="section">
                    <div className="section__container">
                        <Cats category={router.isReady ? router.query.category_id : null} />
                    </div>
                </section>

            </Layout>
        </>
    )
}
