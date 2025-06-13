import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Document Photo App',
  description: 'Process photos for passport and document requirements',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
