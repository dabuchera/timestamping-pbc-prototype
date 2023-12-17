import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

interface IndexLayoutProps {
  children: React.ReactNode
}

export default async function IndexLayout({ children }: IndexLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      {<Footer />}
    </div>
  )
}
