import '@/css/index.scss';
import Context from '@/contex/BreedContext';

export default function App({ Component, pageProps }) {
  return (
    <Context>
      <Component {...pageProps} />
    </Context>
  )
}
