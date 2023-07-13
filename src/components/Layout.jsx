import { useState, useEffect } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function Layout({ children }) {
    const [mainPadding, setMainPadding] = useState(null);

    useEffect(() => {
        setTimeout(function () {
            setMainPadding(document.getElementsByClassName('header')[0].offsetHeight);

        }, 200);
    }, [mainPadding]);

    return (
        <>
            <Header />
            <main id="main-content" style={{ paddingTop: (mainPadding !== null ? mainPadding : 58) }}>
                {children}
            </main>
            <Footer />
        </>
    );
}
