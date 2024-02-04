import { useQuery } from "react-query"
import { Job } from "../types/job"
import BE_URL from "../BE_URL"

export const useJobQuery = (jobId?: string) => {
    const query = useQuery<Job>(['position', jobId],
        () => fetch(`${BE_URL}/jobs/${jobId}`).then(res => res.json()),
        {
            enabled: !!jobId
        }
    )
    return query
}