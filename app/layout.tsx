import type { Metadata } from 'next'
import './globals.css'
import NavbarMegaMenu from '@/components/NavbarMegaMenu'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Aroma-Zone Like - Produits Naturels & Bio',
  description: 'Découvrez notre sélection de produits naturels et bio pour la beauté, la nutrition et le bien-être.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col">
        <NavbarMegaMenu />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

