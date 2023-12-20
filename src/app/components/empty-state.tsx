"use client"

interface EmptyState {
    title: string;
    subtitle: string;
    showReset?: boolean;
}

export default function EmptyState({
    title = "No Matches",
    subtitle = "Try Changing or Removing some of your filters",
    showReset
}: EmptyState) {
    return (
        <div>Empty</div>
    )
}
