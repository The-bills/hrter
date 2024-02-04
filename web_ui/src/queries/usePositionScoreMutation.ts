import { useMutation } from "react-query"

const BE_URL = 'http://127.0.0.1:5000'

export const usePositionScoreMutation = (positionId: string) => {
    const mutation = useMutation(() => fetch(`${BE_URL}/positions/${positionId}/scores`).then(res => res.text()))
    return mutation
}