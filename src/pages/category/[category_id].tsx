import DogGrid from '@/components/DogGrid'
import Layout from '@/components/Layout'
import Seo from '@/components/Seo'
import { getCategories, getImages, humanize } from '@/lib/dogapi'
import { REVALIDATE, SITE_NAME, SITE_URL } from '@/lib/site'
import { Category, DogImage } from '@/types'
import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'

type Props = {
    category: Category
    images: DogImage[]
    categories: Category[]
}

export default function CategoryPage({ category, images, categories }: Props) {
    const name = humanize(category.name)
    const path = `/category/${category.id}`
    const description = `Dog photos tagged "${name.toLowerCase()}" on ${SITE_NAME}. Load a new batch whenever you want — free, no account needed.`

    const jsonLd = [
        {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: `Dogs with ${name}`,
            url: `${SITE_URL}${path}`,
            description,
            isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
        },
        {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
                { '@type': 'ListItem', position: 2, name: name, item: `${SITE_URL}${path}` },
            ],
        },
    ]

    return (
        <>
            <Seo title={`Dog photos with ${name.toLowerCase()}`} description={description} path={path} image={images[0]?.url} jsonLd={jsonLd} />
            <Layout categories={categories}>
                <section className="hero hero--compact">
                    <div className="container">
                        <nav className="breadcrumb" aria-label="Breadcrumb">
                            <Link href="/">Dogs</Link> <span aria-hidden="true">/</span> <span aria-current="page">{name}</span>
                        </nav>
                        <h1 className="hero__title">Dogs with {name.toLowerCase()}</h1>
                        <p className="hero__lead">
                            Every photo on this page is tagged <strong>{name.toLowerCase()}</strong> in our source catalogue. Hit “More dogs” for
                            another batch, or shuffle for a fresh set.
                        </p>
                    </div>
                </section>

                <section className="section" aria-labelledby="category-gallery">
                    <div className="container">
                        <h2 id="category-gallery" className="sr-only">
                            Photo gallery: dogs with {name.toLowerCase()}
                        </h2>
                        <DogGrid initialImages={images} category={String(category.id)} subject={`Dog with ${name.toLowerCase()}`} />
                    </div>
                </section>
            </Layout>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const categories = await getCategories()

    return {
        paths: categories.map((category) => ({ params: { category_id: String(category.id) } })),
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
    const categoryId = String(params?.category_id ?? '')
    const categories = await getCategories()
    const category = categories.find((item) => String(item.id) === categoryId)

    if (!category) return { notFound: true, revalidate: REVALIDATE }

    const images = await getImages({ limit: 24, categoryId })

    return { props: { category, images, categories }, revalidate: REVALIDATE }
}
