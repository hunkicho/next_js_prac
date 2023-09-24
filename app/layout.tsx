import { Nunito } from 'next/font/google'

import './globals.css'
import Navbar from './components/navbar/Navbar';
import Search from './components/navbar/Search';

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
        <Navbar />
        <Search />
        {children}
      </body>
    </html>
  )
}
