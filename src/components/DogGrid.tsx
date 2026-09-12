import EmptyState from '@/components/EmptyState'
import { DogImage } from '@/types'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

type Props = {
    initialImages: DogImage[]
    category?: string | null
    breed?: string | null
    /** Used to build a human, descriptive alt text. */
    subject?: string
}

function altFor(image: DogImage, subject?: string, index = 0) {
    const breedName = image.breeds?.[0]?.name
    const what = breedName || subject || 'Dog'
    return `${what} photo ${index + 1} from the OnlyDogs gallery`
}

export default function DogGrid({ initialImages, category = null, breed = null, subject }: Props) {
    const [images, setImages] = useState<DogImage[]>(initialImages)
    const [page, setPage] = useState(0)
    const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
    const isFirstRender = useRef(true)

    const fetchImages = async (nextPage: number, mode: 'append' | 'replace') => {
        setStatus('loading')
        try {
            const params = new URLSearchParams({ page: String(nextPage), limit: '24' })
            if (category) params.set('category', category)
            if (breed) params.set('breed', breed)

            const res = await fetch(`/api/images?${params.toString()}`)
            const data: DogImage[] = await res.json()

            setImages((current) => {
                if (mode === 'replace') return data
                const seen = new Set(current.map((image) => image.id))
                return [...current, ...data.filter((image) => !seen.has(image.id))]
            })
            setStatus('idle')
        } catch {
            setStatus('error')
        }
    }

    // Server-rendered images already match the current filters on first paint.
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        setPage(0)
        setImages(initialImages)
    }, [initialImages])

    if (images.length === 0 && status !== 'loading') {
        return (
            <div className="grid">
                <EmptyState what="dog photos" />
                <div className="grid__actions grid__actions--left">
                    <button type="button" className="button" onClick={() => fetchImages(0, 'replace')}>
                        Try again
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="grid">
            <div className="grid__masonry" aria-busy={status === 'loading'}>
                {images.map((image, index) => (
                    <figure className="dog-card" key={`${image.id}-${index}`}>
                        <Image
                            className="dog-card__image"
                            src={image.url}
                            alt={altFor(image, subject, index)}
                            width={image.width || 800}
                            height={image.height || 600}
                            sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 25vw"
                            priority={index < 2}
                            loading={index < 2 ? undefined : 'lazy'}
                            unoptimized
                        />
                        {image.breeds?.[0]?.name && <figcaption className="dog-card__caption">{image.breeds[0].name}</figcaption>}
                    </figure>
                ))}
            </div>

            <p className="grid__status" role="status" aria-live="polite">
                {status === 'loading' && 'Fetching more dogs…'}
                {status === 'error' && 'The dogs are napping. Try again in a moment.'}
                {status === 'idle' && `${images.length} dog photos loaded.`}
            </p>

            <div className="grid__actions">
                <button
                    type="button"
                    className="button"
                    disabled={status === 'loading'}
                    onClick={() => {
                        const next = page + 1
                        setPage(next)
                        fetchImages(next, 'append')
                    }}
                >
                    {status === 'loading' ? 'Loading…' : 'More dogs'}
                </button>
                <button
                    type="button"
                    className="button button--ghost"
                    disabled={status === 'loading'}
                    onClick={() => {
                        setPage(0)
                        fetchImages(0, 'replace')
                    }}
                >
                    Shuffle
                </button>
            </div>
        </div>
    )
}
