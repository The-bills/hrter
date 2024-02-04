import { useMutation, useQuery } from "react-query"

const BE_URL = 'http://127.0.0.1:5000'

export const useDeleteCvQuery = () => {
    const mutation = useMutation<any, unknown, string>(
        (cvId) => fetch(`${BE_URL}/cv/${cvId}`, {
            method: 'DELETE'
        }).then(res => res.json())
    )
    return mutation
}