import Context from '@/contex/BreedContext'
import '@/css/index.scss'
import PlausibleProvider from 'next-plausible'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <PlausibleProvider src="https://plausible.morpheus90.com/js/pa-eRZWW3v3RU7snouQtGM8F.js">
            <Context>
                <Component {...pageProps} />
            </Context>
        </PlausibleProvider>
    )
}
