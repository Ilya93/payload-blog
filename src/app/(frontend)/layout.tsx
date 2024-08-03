import type { Metadata } from 'next'
import React from 'react'

import { mergeOpenGraph } from '../utilities/mergeOpenGraph'

import './globals.css'
import { ThemeProvider } from '@/components/Theme/ThemeProvider'
import { ThemeSwitcher } from '@/components/Theme/ThemeSwitcher'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LivePreviewListener />
          <ThemeSwitcher />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
