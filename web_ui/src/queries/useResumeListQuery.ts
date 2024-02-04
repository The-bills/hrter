import { useQuery } from "react-query"
import { Resume } from "../types/resume"
import BE_URL from "../BE_URL"

export const useResumeListQuery = () => {
    const query = useQuery<Resume[]>('resumeList', () => fetch(`${BE_URL}/resumes/`).then(res => res.json()))
    return query
}