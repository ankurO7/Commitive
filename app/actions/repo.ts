"use server"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function addRepo(formData:FormData) {
    const name = formData.get("name") as string
    const url = formData.get("url") as string

    await prisma.repository.create({
        data: {
            name,
            url,
            ownerId:"clxxxxx..."
        }
    })
    revalidatePath("/")
    
}