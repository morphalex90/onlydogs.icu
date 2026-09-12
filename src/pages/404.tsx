import Layout from '@/components/Layout'
import Seo from '@/components/Seo'
import Link from 'next/link'

export default function Page404() {
    return (
        <>
            <Seo title="Page not found" description="That page ran off. The dogs are still here." path="/404" noindex />
            <Layout>
                <section className="hero">
                    <div className="container">
                        <h1 className="hero__title">This page ran off</h1>
                        <p className="hero__lead">Nothing here — but the dogs are one tap away.</p>
                        <div className="grid__actions grid__actions--left">
                            <Link className="button" href="/">
                                Back to the dogs
                            </Link>
                            <Link className="button button--ghost" href="/breeds">
                                Browse breeds
                            </Link>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    )
}
