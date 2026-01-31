import Context from '@/contex/BreedContext'
import '@/css/index.scss'
import PlausibleProvider from 'next-plausible'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <PlausibleProvider
            domain="onlydogs.icu"
            selfHosted={true}
            trackOutboundLinks={true}
            scriptProps={{ src: 'https://plausible.morpheus90.com/js/script.js' }}
        >
            <Context>
                <Component {...pageProps} />
            </Context>
        </PlausibleProvider>
    )
}
