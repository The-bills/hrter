export type Job = {
    id: string
    name: string
    description: string
    created_at: string
    summary: string | null
    scores: Record<string, number> | null
}
