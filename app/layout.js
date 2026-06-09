import ClientLayout from '@/components/ClientLayout'
import './globals.css'

export const metadata = {
  title: 'Nexix Technology — We Build Digital Brands',
  description: 'From concept to launch — we craft high-performance websites & applications that drive real business growth.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
