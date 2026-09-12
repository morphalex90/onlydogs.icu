import { THEME_BOOTSTRAP_SCRIPT } from '@/lib/theme'
import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                {/* Applies a stored colour choice before first paint (WCAG 1.4.8). */}
                <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP_SCRIPT }} />
                {/* Vector first: modern browsers take icon.svg and ignore the rasters below. */}
                <link rel="icon" type="image/svg+xml" href="/icon.svg" />
                <link rel="icon" href="/favicon.ico" sizes="16x16 32x32 48x48" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
                <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
                <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png" />
                <link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-60x60.png" />
                <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png" />
                <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png" />
                <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png" />
                <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png" />
                <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png" />
                <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png" />
                <link rel="apple-touch-icon" sizes="167x167" href="/apple-touch-icon-167x167.png" />
                {/* Safari pinned tabs render a single-colour mask, not the tile. */}
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ff69b4" />
                <link rel="manifest" href="/site.webmanifest" />
                <meta name="msapplication-config" content="/browserconfig.xml" />
                <link rel="preconnect" href="https://cdn2.thedogapi.com" />
                <link rel="dns-prefetch" href="https://api.thedogapi.com" />
                <meta name="apple-mobile-web-app-title" content="OnlyDogs" />
                <meta name="application-name" content="OnlyDogs" />
                <meta name="msapplication-TileColor" content="#0b0b0f" />
                <meta name="theme-color" content="#0b0b0f" />
            </Head>
            <body>
                <noscript>OnlyDogs works without JavaScript. The first batch of photos is already on the page.</noscript>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
