import { SITE_NAME } from '@/lib/site'
import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__brand">
                    <span className="footer__logo">{SITE_NAME}</span>
                    <p>
                        Dog photos served fresh, free and without an account. Photos come from{' '}
                        <a href="https://thedogapi.com" target="_blank" rel="noreferrer">
                            The Dog API
                        </a>
                        .
                    </p>
                </div>

                <nav className="footer__nav" aria-label="Footer">
                    <Link href="/">All dogs</Link>
                    <Link href="/breeds">Dog breeds</Link>
                </nav>

                <div className="footer__copyright">
                    &copy; {new Date().getFullYear()}{' '}
                    <a href="https://www.pieronanni.me" target="_blank" rel="noreferrer">
                        Piero Nanni
                    </a>{' '}
                    &middot;{' '}
                    <a href="https://www.buymeacoffee.com/morphalex90" target="_blank" rel="noreferrer">
                        Buy me a 🍺
                    </a>
                </div>
            </div>
        </footer>
    )
}
