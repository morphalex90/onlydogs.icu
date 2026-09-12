import { DEFAULT_THEME, isThemeId, THEME_STORAGE_KEY, ThemeId, THEMES } from '@/lib/theme'
import { useEffect, useState } from 'react'

/**
 * Colour picker for WCAG 1.4.8. Native radios in a fieldset: arrow keys, labels
 * and grouping come from the platform rather than from ARIA we would have to
 * keep correct by hand.
 */
export default function ThemeControl() {
    const [theme, setTheme] = useState<ThemeId>(DEFAULT_THEME)
    const [announcement, setAnnouncement] = useState('')

    // The bootstrap script in _document already painted the stored theme; this
    // only syncs React state to it after hydration.
    useEffect(() => {
        const stored = document.documentElement.getAttribute('data-theme')
        if (isThemeId(stored)) setTheme(stored)
    }, [])

    const choose = (next: ThemeId) => {
        setTheme(next)
        document.documentElement.setAttribute('data-theme', next)
        try {
            localStorage.setItem(THEME_STORAGE_KEY, next)
        } catch {
            // Private mode or blocked storage: the choice still applies for this page.
        }
        setAnnouncement(`${THEMES.find((item) => item.id === next)?.label} colours applied.`)
    }

    return (
        <fieldset className="theme">
            <legend className="theme__legend">Colours</legend>
            <p className="theme__hint">Pick the text and background colours that read best for you. Every option meets WCAG AAA contrast.</p>
            <div className="theme__options">
                {THEMES.map((item) => (
                    <label className="theme__option" key={item.id}>
                        <input type="radio" name="theme" value={item.id} checked={theme === item.id} onChange={() => choose(item.id)} />
                        <span className="theme__label">
                            {item.label}
                            <span className="sr-only">. {item.hint}</span>
                        </span>
                    </label>
                ))}
            </div>
            <p className="sr-only" role="status" aria-live="polite">
                {announcement}
            </p>
        </fieldset>
    )
}
