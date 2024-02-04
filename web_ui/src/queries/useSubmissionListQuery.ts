import { useQuery } from "react-query";
import { Job } from "../types/job";
import BE_URL from "../BE_URL";
import { Submission } from "../types/submission";

export const useSubmissionListQuery = (jobId?: string) => {
  const query = useQuery<Submission[]>("jobList", () =>
    fetch(`${BE_URL}/jobs/${jobId}/submissions/`).then((res) => res.json())
  );
  return query;
};
