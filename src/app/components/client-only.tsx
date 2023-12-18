"use client"

export default function ClientOnly({ children }: {
    children: React.ReactNode
}) {
    return (
        <div>
            {children}
        </div>
    )
}
