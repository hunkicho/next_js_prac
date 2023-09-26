import { Nunito } from 'next/font/google'

import './globals.css'
import Navbar from './components/navbar/Navbar';
import ClientOnly from './components/ClientOnly';
import RegisterModal from './components/modals/RegisterModal';
import ToasterProvider from './providers/ToasterProvider';

export const metadata = {
  title: 'reservation test app',
  description: 'airbnb clone',
}

const font = Nunito({
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          {/* <Modal title="hello" actionLabel='Submit' isOpen={true} /> */}
          <Navbar />
        </ClientOnly>
        
        {children}
      </body>
    </html>
  )
}
