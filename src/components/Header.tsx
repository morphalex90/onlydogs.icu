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
