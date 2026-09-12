import EmptyState from '@/components/EmptyState'
import Layout from '@/components/Layout'
import Seo from '@/components/Seo'
import { getBreeds, getCategories, slugify } from '@/lib/dogapi'
import { REVALIDATE, SITE_NAME, SITE_URL } from '@/lib/site'
import { BreedType, Category } from '@/types'
import { GetStaticProps } from 'next'
import Link from 'next/link'

type Props = { breeds: BreedType[]; categories: Category[] }

export default function BreedsPage({ breeds, categories }: Props) {
    const groups = breeds.reduce<Record<string, BreedType[]>>((acc, breed) => {
        const letter = breed.name.charAt(0).toUpperCase()
        acc[letter] = acc[letter] ? [...acc[letter], breed] : [breed]
        return acc
    }, {})
    const letters = Object.keys(groups).sort()

    const description = `Every dog breed we have photos for, from ${breeds[0]?.name ?? 'A'} to ${
        breeds[breeds.length - 1]?.name ?? 'Z'
    }. Pick a breed for its gallery, temperament, size and life span.`

    const jsonLd = [
        {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Dog breeds directory',
            url: `${SITE_URL}/breeds`,
            description,
            isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
        },
    ]

    return (
        <>
            <Seo title="Dog breeds directory" description={description} path="/breeds" jsonLd={jsonLd} />
            <Layout categories={categories}>
                <section className="hero hero--compact">
                    <div className="container">
                        <nav className="breadcrumb" aria-label="Breadcrumb">
                            <Link href="/">Dogs</Link> <span aria-hidden="true">/</span> <span aria-current="page">Breeds</span>
                        </nav>
                        <h1 className="hero__title">Dog breeds, A to Z</h1>
                        <p className="hero__lead">
                            {breeds.length > 0 ? `${breeds.length} breeds with photos.` : 'Breed pages'} Each one has the gallery plus temperament,
                            typical size, life span and what the breed was originally bred for.
                        </p>
                    </div>
                </section>

                <section className="section" aria-labelledby="breed-index">
                    <div className="container">
                        <h2 id="breed-index" className="sr-only">
                            Breed index
                        </h2>
                        {breeds.length === 0 && <EmptyState what="breeds" />}
                        <nav className="alpha-nav" aria-label="Jump to letter">
                            {letters.map((letter) => (
                                <a key={letter} href={`#letter-${letter}`} aria-label={`Jump to breeds starting with ${letter}`}>
                                    <span aria-hidden="true">{letter}</span>
                                </a>
                            ))}
                        </nav>

                        {letters.map((letter) => (
                            <div className="breed-group" key={letter}>
                                <h2 id={`letter-${letter}`} className="breed-group__title">
                                    {letter}
                                </h2>
                                <ul className="chip-list" aria-labelledby={`letter-${letter}`}>
                                    {groups[letter].map((breed) => (
                                        <li key={breed.id}>
                                            <Link
                                                href={`/breed/${breed.id}-${slugify(breed.name)}`}
                                                aria-label={`${breed.name} photos and breed facts`}
                                            >
                                                {breed.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
            </Layout>
        </>
    )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const [breeds, categories] = await Promise.all([getBreeds(), getCategories()])

    return {
        props: { breeds: breeds.sort((a, b) => a.name.localeCompare(b.name)), categories },
        revalidate: REVALIDATE,
    }
}
