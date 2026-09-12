import { BreedType, Category, DogImage } from '@/types'

const API_BASE = 'https://api.thedogapi.com/v1'

/**
 * The key used to live in NEXT_PUBLIC_CAT_API, which shipped it to the browser.
 * DOG_API_KEY is preferred; the public name is kept as a fallback so existing
 * deployments keep working.
 */
const API_KEY = process.env.DOG_API_KEY || process.env.NEXT_PUBLIC_CAT_API || ''

type Query = Record<string, string | number | undefined | null>

async function api<T>(path: string, query: Query = {}, fallback: T): Promise<T> {
    const params = new URLSearchParams()
    Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') params.set(key, String(value))
    })

    const url = `${API_BASE}${path}?${params.toString()}`

    try {
        const res = await fetch(url, {
            headers: API_KEY ? { 'x-api-key': API_KEY } : {},
        })
        if (!res.ok) return fallback
        return (await res.json()) as T
    } catch {
        return fallback
    }
}

export function slugify(value: string): string {
    return value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
}

export function getCategories(): Promise<Category[]> {
    return api<Category[]>('/categories', { limit: 25 }, [])
}

export function getBreeds(limit = 200): Promise<BreedType[]> {
    return api<BreedType[]>('/breeds', { limit, page: 0 }, [])
}

export function getImages({
    limit = 30,
    categoryId,
    breedId,
    page = 0,
}: {
    limit?: number
    categoryId?: string | number
    breedId?: string | number
    page?: number
}): Promise<DogImage[]> {
    return api<DogImage[]>(
        '/images/search',
        {
            limit,
            page,
            order: 'RANDOM',
            has_breeds: breedId ? 1 : undefined,
            category_ids: categoryId,
            breed_ids: breedId,
        },
        [],
    )
}

/** "hats" -> "Hats", "sunglasses" -> "Sunglasses" */
export function humanize(value: string): string {
    return value
        .replace(/[-_]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .replace(/\b\w/g, (c) => c.toUpperCase())
}
