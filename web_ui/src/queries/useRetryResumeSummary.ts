import { useMutation } from "react-query"
import BE_URL from "../BE_URL"

export const useRetryResumeSummary = () => {
    const mutation = useMutation<any, unknown, string>(
        (resumeId) => fetch(`${BE_URL}/resumes/${resumeId}/summary/retry`, {
            method: 'POST'
        }).then(res => res.json())
    )
    return mutation
}