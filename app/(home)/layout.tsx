interface IndexLayoutProps {
  children: React.ReactNode
}

export default async function IndexLayout({ children }: IndexLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col justify-center">
      <div className="grid justify-items-center ...">
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
