import { humanize } from '@/lib/dogapi'
import { Category } from '@/types'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Header({ categories = [] }: { categories?: Category[] }) {
    const router = useRouter()
    const isActive = (href: string) => router.asPath.split('?')[0] === href

    return (
        <header className="header">
            <div className="header__bar">
                <Link className="header__logo" href="/">
                    <svg className="header__logo-mark" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
                        <rect width="64" height="64" rx="15" fill="#ff69b4" />
                        <g fill="#0b0b0f" transform="rotate(-35 32 32) scale(0.87) translate(4.8 4.8)">
                            <rect x="15" y="26" width="34" height="12" rx="6" />
                            <circle cx="16" cy="25" r="8" />
                            <circle cx="16" cy="39" r="8" />
                            <circle cx="48" cy="25" r="8" />
                            <circle cx="48" cy="39" r="8" />
                        </g>
                    </svg>
                    Only<span>Dogs</span>
                </Link>

                <nav className="header__main-nav" aria-label="Main">
                    <Link href="/breeds" className={isActive('/breeds') ? 'is-active' : ''} aria-current={isActive('/breeds') ? 'page' : undefined}>
                        Breeds
                    </Link>
                </nav>
            </div>

            {categories.length > 0 && (
                <nav className="header__chips" aria-label="Photo themes">
                    <ul>
                        <li>
                            <Link href="/" className={isActive('/') ? 'is-active' : ''} aria-current={isActive('/') ? 'page' : undefined}>
                                All dogs
                            </Link>
                        </li>
                        {categories.map((category) => (
                            <li key={category.id}>
                                <Link
                                    href={`/category/${category.id}`}
                                    className={isActive(`/category/${category.id}`) ? 'is-active' : ''}
                                    aria-current={isActive(`/category/${category.id}`) ? 'page' : undefined}
                                >
                                    {humanize(category.name)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </header>
    )
}
