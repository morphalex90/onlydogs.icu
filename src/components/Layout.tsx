import { useState, useEffect, ReactNode } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function Layout({ children }: { children: ReactNode }) {
    const [mainPadding, setMainPadding] = useState<number>(58);

    useEffect(() => {
        setTimeout(function () {
            const header = document.querySelector('header') as HTMLElement | null
            if (header !== null) {
                setMainPadding(header.offsetHeight);
            }
        }, 200);
    }, [mainPadding]);

    return (
        <>
            <Header />
            <main id="main-content" style={{ paddingTop: mainPadding }}>
                {children}
            </main>
            <Footer />
        </>
    );
}
