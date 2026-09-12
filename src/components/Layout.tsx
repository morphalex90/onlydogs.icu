import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { Category } from '@/types'
import { ReactNode } from 'react'

export default function Layout({ children, categories = [] }: { children: ReactNode; categories?: Category[] }) {
    return (
        <>
            <a className="skip-link" href="#main-content">
                Skip to the dogs
            </a>
            <Header categories={categories} />
            <main id="main-content">{children}</main>
            <Footer />
        </>
    )
}
