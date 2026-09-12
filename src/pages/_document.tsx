import { THEME_BOOTSTRAP_SCRIPT } from '@/lib/theme'
import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                {/* Applies a stored colour choice before first paint (WCAG 1.4.8). */}
                <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP_SCRIPT }} />
                <link rel="preconnect" href="https://cdn2.thedogapi.com" />
                <link rel="dns-prefetch" href="https://api.thedogapi.com" />
                <meta name="apple-mobile-web-app-title" content="OnlyDogs" />
                <meta name="application-name" content="OnlyDogs" />
                <meta name="msapplication-TileColor" content="#0b0b0f" />
                <meta name="theme-color" content="#0b0b0f" />
            </Head>
            <body>
                <noscript>OnlyDogs works without JavaScript — the first batch of photos is already on the page.</noscript>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
