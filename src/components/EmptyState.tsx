/**
 * Shown when the dog API returns nothing, usually a missing or rate-limited key.
 * In development we say so out loud, in production we keep it friendly.
 */
export default function EmptyState({ what = 'dogs' }: { what?: string }) {
    return (
        <div className="empty">
            <p className="empty__title">No {what} to show right now.</p>
            <p className="empty__text">
                {process.env.NODE_ENV === 'development'
                    ? 'The Dog API returned nothing. Set DOG_API_KEY in .env.local (get a free key at thedogapi.com) and restart the dev server.'
                    : 'The photo service is not answering at the moment. Try again in a minute.'}
            </p>
        </div>
    )
}
