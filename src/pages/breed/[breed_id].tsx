import DogGrid from '@/components/DogGrid'
import Layout from '@/components/Layout'
import Seo from '@/components/Seo'
import { getBreeds, getCategories, getImages, slugify } from '@/lib/dogapi'
import { REVALIDATE, SITE_NAME, SITE_URL } from '@/lib/site'
import { BreedType, Category, DogImage } from '@/types'
import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'

type Props = {
    breed: BreedType
    images: DogImage[]
    categories: Category[]
    related: BreedType[]
}

function facts(breed: BreedType) {
    return [
        { label: 'Temperament', value: breed.temperament },
        { label: 'Bred for', value: breed.bred_for },
        { label: 'Breed group', value: breed.breed_group },
        { label: 'Life span', value: breed.life_span },
        { label: 'Weight', value: breed.weight?.metric ? `${breed.weight.metric} kg` : undefined },
        { label: 'Height', value: breed.height?.metric ? `${breed.height.metric} cm` : undefined },
        { label: 'Origin', value: breed.origin },
    ].filter((fact) => Boolean(fact.value))
}

export default function BreedPage({ breed, images, categories, related }: Props) {
    const path = `/breed/${breed.id}-${slugify(breed.name)}`
    const description = `${breed.name} photos plus the quick facts: ${[breed.temperament, breed.life_span && `life span ${breed.life_span}`]
        .filter(Boolean)
        .join(', ')}. Free ${breed.name} pictures on ${SITE_NAME}.`.slice(0, 300)

    const jsonLd = [
        {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: `${breed.name} photos`,
            url: `${SITE_URL}${path}`,
            description,
            about: {
                '@type': 'Thing',
                name: breed.name,
                description: [breed.bred_for, breed.temperament].filter(Boolean).join('. '),
            },
            isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
        },
        {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
                { '@type': 'ListItem', position: 2, name: 'Dog breeds', item: `${SITE_URL}/breeds` },
                { '@type': 'ListItem', position: 3, name: breed.name, item: `${SITE_URL}${path}` },
            ],
        },
    ]

    return (
        <>
            <Seo title={`${breed.name} photos and breed facts`} description={description} path={path} image={images[0]?.url} jsonLd={jsonLd} />
            <Layout categories={categories}>
                <section className="hero hero--compact">
                    <div className="container">
                        <nav className="breadcrumb" aria-label="Breadcrumb">
                            <Link href="/">Dogs</Link> <span aria-hidden="true">/</span> <Link href="/breeds">Breeds</Link>{' '}
                            <span aria-hidden="true">/</span> <span aria-current="page">{breed.name}</span>
                        </nav>
                        <h1 className="hero__title">{breed.name} photos</h1>
                        {breed.bred_for && (
                            <p className="hero__lead">
                                The {breed.name} was bred for {breed.bred_for.toLowerCase()}
                                {breed.origin ? ` and comes from ${breed.origin}` : ''}. Below: a gallery you can keep refreshing, and the facts worth
                                knowing before you fall for one.
                            </p>
                        )}
                    </div>
                </section>

                <section className="section" aria-labelledby="breed-gallery">
                    <div className="container">
                        <h2 id="breed-gallery" className="sr-only">
                            {breed.name} photo gallery
                        </h2>
                        <DogGrid initialImages={images} breed={String(breed.id)} subject={breed.name} />
                    </div>
                </section>

                <section className="section" aria-labelledby="breed-facts">
                    <div className="container prose">
                        <h2 id="breed-facts" className="section__title">
                            {breed.name} at a glance
                        </h2>
                        <dl className="facts">
                            {facts(breed).map((fact) => (
                                <div className="facts__row" key={fact.label}>
                                    <dt>{fact.label}</dt>
                                    <dd>{fact.value}</dd>
                                </div>
                            ))}
                        </dl>
                        <p className="note">Breed data comes from The Dog API and is a starting point, not veterinary advice.</p>
                    </div>
                </section>

                {related.length > 0 && (
                    <section className="section" aria-labelledby="related-breeds">
                        <div className="container">
                            <h2 id="related-breeds" className="section__title">
                                Other breeds people look at
                            </h2>
                            <ul className="chip-list">
                                {related.map((item) => (
                                    <li key={item.id}>
                                        <Link href={`/breed/${item.id}-${slugify(item.name)}`} aria-label={`${item.name} photos and breed facts`}>
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                )}
            </Layout>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const breeds = await getBreeds()

    return {
        paths: breeds.slice(0, 60).map((breed) => ({ params: { breed_id: `${breed.id}-${slugify(breed.name)}` } })),
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
    const raw = String(params?.breed_id ?? '')
    const id = raw.split('-')[0]

    const [breeds, categories] = await Promise.all([getBreeds(), getCategories()])
    const breed = breeds.find((item) => String(item.id) === id)

    if (!breed) return { notFound: true, revalidate: REVALIDATE }

    const canonicalSlug = `${breed.id}-${slugify(breed.name)}`
    if (raw !== canonicalSlug) {
        return { redirect: { destination: `/breed/${canonicalSlug}`, permanent: true } }
    }

    const images = await getImages({ limit: 24, breedId: breed.id })
    const index = breeds.findIndex((item) => String(item.id) === id)
    const related = [...breeds.slice(index + 1, index + 7), ...breeds.slice(Math.max(0, index - 6), index)].slice(0, 8)

    return { props: { breed, images, categories, related }, revalidate: REVALIDATE }
}
