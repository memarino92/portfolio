import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'
import Script from 'next/script'

export const metadata = {
  title: {
    template: '%s - Michael Marino',
    default: 'Michael Marino - Full Stack Developer',
  },
  description: `I'm Michael, a software engineer based in Richmond, Virginia.`,
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <Script
        src="https://umami.michaelmarino.dev/script.js"
        strategy="lazyOnload"
        data-website-id="5e50d761-8a49-455a-b979-521b8a0f009f"
      />
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
