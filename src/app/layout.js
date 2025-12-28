import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from './compo/Navbar';
import ClientProviders from './compo/ClientProviders';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        <ClientProviders>
          <Navbar />
          <main className="mt-20">{children}</main>
        </ClientProviders>
      </body>
    </html>
  );
}
