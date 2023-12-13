import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'

import Navbar from './components/Navbar/Navbar'
import RegisterModal from './components/Modals/register-modal'
import ToasterProvider from './providers/toast-provider'
import LoginModal from './components/Modals/login-modal'
import { getCurrentUser } from './actions/get-current-user'

const font = Nunito({
  subsets:['latin']
})

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb Clone',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
  }) {
  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <LoginModal/>
        <RegisterModal/>
        <Navbar currentUser={currentUser} />
        
        {children}</body>
    </html>
  )
}
