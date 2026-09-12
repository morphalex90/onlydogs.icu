/**
 * WCAG 1.4.8 asks for a mechanism that lets the reader pick foreground and
 * background colours. Every palette below is checked against 7:1 for body text
 * and 3:1 for control borders, so no choice can drop the page out of AAA.
 */

export const THEME_STORAGE_KEY = 'onlydogs-theme'

export type ThemeId = 'dark' | 'dark-contrast' | 'light' | 'light-contrast'

export const THEMES: { id: ThemeId; label: string; hint: string }[] = [
    { id: 'dark', label: 'Dark', hint: 'Light text on near-black. The default.' },
    { id: 'dark-contrast', label: 'Dark, high contrast', hint: 'White on pure black, brighter pink.' },
    { id: 'light', label: 'Light', hint: 'Dark text on white.' },
    { id: 'light-contrast', label: 'Light, high contrast', hint: 'Black on white, deepest pink.' },
]

export const DEFAULT_THEME: ThemeId = 'dark'

export function isThemeId(value: unknown): value is ThemeId {
    return typeof value === 'string' && THEMES.some((theme) => theme.id === value)
}

/**
 * Runs in <head> before first paint so a stored choice never flashes the
 * default palette. Kept tiny and dependency-free on purpose.
 */
export const THEME_BOOTSTRAP_SCRIPT = `(function(){try{var t=localStorage.getItem(${JSON.stringify(
    THEME_STORAGE_KEY,
)});if(t==='dark'||t==='dark-contrast'||t==='light'||t==='light-contrast'){document.documentElement.setAttribute('data-theme',t)}}catch(e){}})()`
