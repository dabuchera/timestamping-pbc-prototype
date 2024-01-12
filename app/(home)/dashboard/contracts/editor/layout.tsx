interface EditorProps {
  children?: React.ReactNode
}

export default function EditorLayout({ children }: EditorProps) {
  return (
    <div className="container mx-auto grid items-start">
      {children}
    </div>
  )
}
