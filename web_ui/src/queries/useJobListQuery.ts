import { useQuery } from "react-query"
import { Job } from "../types/job"
import BE_URL from "../BE_URL"

export const useJobListQuery = () => {
    const query = useQuery<Job[]>('jobList', () => fetch(`${BE_URL}/jobs/`).then(res => res.json()))
    return query
}