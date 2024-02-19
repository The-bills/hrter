import { useQuery } from "react-query";
import BE_URL from "../BE_URL";
import { Submission } from "../types/submission";

export const useGetRecommendation = (jobId?: string, submissionId?: string, enable?: boolean) => {
  const query = useQuery<any>(["recommendation", jobId, submissionId], () =>
    fetch(`${BE_URL}/jobs/${jobId}/submissions/${submissionId}/recommendation`).then((res) => res.json()),
    {
      enabled: enable
    }
  );
  return query;
};

