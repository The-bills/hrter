import { useQuery } from "react-query";
import BE_URL from "../BE_URL";
import { Submission } from "../types/submission";

export const useGetRecommended = (jobId?: string) => {
  const query = useQuery<Submission[]>(["recommended", jobId], () =>
    fetch(`${BE_URL}/jobs/${jobId}/recommended`).then((res) => res.json())
  );
  return query;
};


