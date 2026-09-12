import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site'
import Head from 'next/head'

type Props = {
    title: string
    description?: string
    path?: string
    image?: string
    noindex?: boolean
    /** JSON-LD blocks rendered into the head. */
    jsonLd?: object[]
}

export default function Seo({ title, description = SITE_DESCRIPTION, path = '/', image, noindex = false, jsonLd = [] }: Props) {
    const url = `${SITE_URL}${path}`
    const fullTitle = path === '/' ? title : `${title} | ${SITE_NAME}`

    return (
        <Head>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
            <link rel="canonical" href={url} />
            {noindex && <meta name="robots" content="noindex, follow" />}

            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            {image && <meta property="og:image" content={image} />}

            <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            {image && <meta name="twitter:image" content={image} />}

            {jsonLd.map((block, index) => (
                <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }} />
            ))}
        </Head>
    )
}
