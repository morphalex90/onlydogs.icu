import '@/css/index.scss';
import Context from '@/contex/BreedContext';
import type { AppProps } from "next/app";
import PlausibleProvider from 'next-plausible';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PlausibleProvider domain="onlydogs.icu" selfHosted={true} trackOutboundLinks={true} scriptProps={{ src: 'https://plausible.morpheus90.com/js/script.js' }}>
      <Context>
        <Component {...pageProps} />
      </Context>
    </PlausibleProvider>
  )
}
