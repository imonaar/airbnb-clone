import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'

import Navbar from './components/Navbar/Navbar'
import RegisterModal from './components/Modals/register-modal'
import ToasterProvider from './providers/toast-provider'

const font = Nunito({
  subsets:['latin']
})

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb Clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider/>
        <RegisterModal/>
        <Navbar/>
        
        {children}</body>
    </html>
  )
}