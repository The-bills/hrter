import { useMutation, useQuery, useQueryClient } from "react-query"
import BE_URL from "../BE_URL"

export const useStatusResumeScores = (resumeId: string, enable?: boolean) => {
    const queryClient = useQueryClient()
    const query = useQuery<unknown, unknown, boolean>(['statusResumeScores', resumeId],
        () => fetch(`${BE_URL}/resumes/${resumeId}/scores/status`, {
            method: 'GET'
        }).then(res => res.json()), {enabled: enable, refetchInterval: 2000, onSuccess: (data)=>{
            if(data == false) queryClient.invalidateQueries(['resume', resumeId])
        }}
    )
    return query
}