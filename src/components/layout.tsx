import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import CursorGlow from './motion/cursor-glow'
import CurtainLoader from './motion/curtain-loader'
import SmoothScroll from './motion/smooth-scroll'
import CTA from './sections/shared/cta'
import Footer from './sections/shared/footer'
import Navbar from './sections/shared/navbar'
import WhatsAppButton from './whatsapp-button'

const ScrollToTop = () => {
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    return null
}

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <ScrollToTop />
            <SmoothScroll />
            <CurtainLoader />
            <CursorGlow />
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:rounded-none focus:bg-primary focus:text-primary-foreground"
            >
                Skip to main content
            </a>
            <Navbar />
            <main id="main-content">
                {children}
                <CTA />
            </main>
            <Footer />
            <WhatsAppButton />
        </>
    )
}

export default Layout
