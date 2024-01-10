"use client"

import { useRouter } from "next/navigation";
import Heading from "./heading";
import Button from "./button";

interface EmptyState {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
}

export default function EmptyState({
    title = "No Matches",
    subtitle = "Try Changing or Removing some of your filters",
    showReset
}: EmptyState) {
    const router = useRouter()
    return (
        <div className="h-[60vh] flex flex-col justify-center items-center gap-2">
            <Heading center title={title} subtitle={subtitle} />
            <div className="w-48 mt-4">
                {showReset && (
                    <Button outline label="Remove all filters" onClick={() => router.push('/')} />
                )}
            </div>
        </div>
    )
}
