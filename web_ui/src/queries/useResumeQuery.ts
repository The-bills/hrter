import { useQuery } from "react-query";
import BE_URL from "../BE_URL";
import { Resume } from "../types/resume";

export const useResumeQuery = (resumeId?: string) => {
  const query = useQuery<Resume>(
    ["resume", resumeId],
    () => fetch(`${BE_URL}/resumes/${resumeId!}`).then((res) => res.json()),
    { enabled: !!resumeId }
  );
  return query;
};
