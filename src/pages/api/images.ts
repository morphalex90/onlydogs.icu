import { getImages } from '@/lib/dogapi'
import { DogImage } from '@/types'
import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * Server-side proxy for the dog API so the key never reaches the browser.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<DogImage[]>) {
    const { category, breed, page, limit } = req.query

    const images = await getImages({
        categoryId: typeof category === 'string' ? category : undefined,
        breedId: typeof breed === 'string' ? breed : undefined,
        page: Number(page) || 0,
        limit: Math.min(Number(limit) || 24, 50),
    })

    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=600')
    res.status(200).json(images)
}
