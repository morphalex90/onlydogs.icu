import '@/css/index.scss';
import Context from '@/contex/BreedContext';
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Context>
      <Component {...pageProps} />
    </Context>
  )
}
