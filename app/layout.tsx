import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './components/navbar/Navbar'
import ClientOnly from './components/ClientOnly'

import RegisterModal from './components/modals/RegisterModal'
import RentModal from './components/modals/RentModal'
import LoginModal from './components/modals/LoginModal'

import ToasterProvider from './providers/ToasterProvider'
import getCurrentUser from './actions/getCurrentUser'
import SearchModal from './components/modals/SearchModal'


const font = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ghar Rent',
  description: 'Rent your home as a Hotel',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider/>
          <SearchModal/>
          <RentModal/>
          <LoginModal/>
          <RegisterModal />
          <Navbar currentUser={currentUser}  />
        </ClientOnly>
        <div className='pb-20 pt-28'>
          {children}
        </div>
        </body>
    </html>
  )
}
