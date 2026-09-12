import { getBreeds, getCategories, slugify } from '@/lib/dogapi'
import { SITE_URL } from '@/lib/site'
import { GetServerSideProps } from 'next'

function url(path: string, priority: string, changefreq: string) {
    return `<url><loc>${SITE_URL}${path}</loc><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    const [categories, breeds] = await Promise.all([getCategories(), getBreeds()])

    const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${url('/', '1.0', 'daily')}
${url('/breeds', '0.9', 'weekly')}
${categories.map((category) => url(`/category/${category.id}`, '0.7', 'weekly')).join('\n')}
${breeds.map((breed) => url(`/breed/${breed.id}-${slugify(breed.name)}`, '0.8', 'weekly')).join('\n')}
</urlset>`

    res.setHeader('Content-Type', 'application/xml')
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate')
    res.write(body)
    res.end()

    return { props: {} }
}

export default function Sitemap() {
    return null
}
