import DogGrid from '@/components/DogGrid'
import Layout from '@/components/Layout'
import Seo from '@/components/Seo'
import { getBreeds, getCategories, getImages, humanize, slugify } from '@/lib/dogapi'
import { REVALIDATE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site'
import { BreedType, Category, DogImage } from '@/types'
import { GetStaticProps } from 'next'
import Link from 'next/link'

type Props = {
    images: DogImage[]
    categories: Category[]
    breeds: BreedType[]
}

const faq = [
    {
        q: 'Is OnlyDogs free to use?',
        a: 'Yes. There is no account, no paywall and no newsletter gate. Open the page and the dogs are already there.',
    },
    {
        q: 'Where do the dog photos come from?',
        a: 'Every photo is served through The Dog API, an open catalogue of dog images with breed metadata attached.',
    },
    {
        q: 'Can I look for one specific breed?',
        a: 'Yes. The breeds directory lists every breed we have photos for, with its temperament, size and life span next to the gallery.',
    },
    {
        q: 'Can I use these dog pictures on my own site?',
        a: 'The images are hosted by The Dog API and keep their original licences, so check the source before reusing a photo commercially.',
    },
]

export default function Home({ images, categories, breeds }: Props) {
    const jsonLd = [
        {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: SITE_NAME,
            url: SITE_URL,
            description: SITE_DESCRIPTION,
        },
        {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faq.map((item) => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: { '@type': 'Answer', text: item.a },
            })),
        },
    ]

    return (
        <>
            <Seo
                title="OnlyDogs — endless cute dog photos, free and without signup"
                description={SITE_DESCRIPTION}
                path="/"
                image={images[0]?.url}
                jsonLd={jsonLd}
            />
            <Layout categories={categories}>
                <section className="hero">
                    <div className="container">
                        <h1 className="hero__title">
                            Dog photos, <span>on tap</span>
                        </h1>
                        <p className="hero__lead">
                            A wall of dogs for the days that need one. Scroll, load more, or jump straight to the breed you were thinking about. No
                            account, no popups, no cookie maze.
                        </p>
                    </div>
                </section>

                <section className="section" aria-labelledby="latest-dogs">
                    <div className="container">
                        <h2 id="latest-dogs" className="section__title">
                            Fresh batch of dogs
                        </h2>
                        <DogGrid initialImages={images} subject="Dog" />
                    </div>
                </section>

                {breeds.length > 0 && (
                    <section className="section" aria-labelledby="popular-breeds">
                        <div className="container">
                            <h2 id="popular-breeds" className="section__title">
                                Looking for a specific breed?
                            </h2>
                            <p className="section__lead">
                                Each breed page collects photos of that dog plus the basics: temperament, size, life span and what the breed was
                                originally bred for.
                            </p>
                            <ul className="chip-list">
                                {breeds.map((breed) => (
                                    <li key={breed.id}>
                                        <Link href={`/breed/${breed.id}-${slugify(breed.name)}`}>{breed.name}</Link>
                                    </li>
                                ))}
                            </ul>
                            <Link className="link-more" href="/breeds">
                                See every dog breed →
                            </Link>
                        </div>
                    </section>
                )}

                {categories.length > 0 && (
                    <section className="section" aria-labelledby="themes">
                        <div className="container">
                            <h2 id="themes" className="section__title">
                                Dogs by theme
                            </h2>
                            <ul className="chip-list">
                                {categories.map((category) => (
                                    <li key={category.id}>
                                        <Link href={`/category/${category.id}`}>{humanize(category.name)}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                )}

                <section className="section" aria-labelledby="faq">
                    <div className="container prose">
                        <h2 id="faq" className="section__title">
                            Questions people ask us
                        </h2>
                        <dl className="faq">
                            {faq.map((item) => (
                                <div className="faq__item" key={item.q}>
                                    <dt>{item.q}</dt>
                                    <dd>{item.a}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </section>
            </Layout>
        </>
    )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const [images, categories, allBreeds] = await Promise.all([getImages({ limit: 24 }), getCategories(), getBreeds()])

    return {
        props: {
            images,
            categories,
            breeds: allBreeds.slice(0, 24),
        },
        revalidate: REVALIDATE,
    }
}
