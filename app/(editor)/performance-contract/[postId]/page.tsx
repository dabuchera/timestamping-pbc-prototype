import { notFound, redirect } from "next/navigation"
import { Contract } from "@prisma/client"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { Editor } from "@/components/editor"

async function getPostForUser(contractId: Contract["id"]) {
  return await db.contract.findFirst({
    where: {
      id: contractId,
    },
  })
}

interface EditorPageProps {
  params: { contractId: string }
}

export default async function EditorPage({ params }: EditorPageProps) {
  
  const contract = await getPostForUser(params.contractId)

  if (!contract) {
    notFound()
  }

  return (
    // <Editor
    //   post={{
    //     id: post.id,
    //     title: post.title,
    //     content: post.content,
    //     published: post.published,
    //   }}
    // />
  )
}
