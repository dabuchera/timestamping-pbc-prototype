import Link from 'next/link';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { ThemeProvider } from '@/components/theme-provider';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface IndexLayoutProps {
  children: React.ReactNode
}

export default async function IndexLayout({
  children,
}: IndexLayoutProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <div className="flex min-h-screen flex-col">
      <Header/>
      <main className="flex-1">{children}</main>
      {<Footer />}
    </div>
    </ThemeProvider>
  )
}
