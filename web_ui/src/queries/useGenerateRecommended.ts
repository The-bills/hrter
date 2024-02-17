import { useMutation } from "react-query";
import BE_URL from "../BE_URL";

export const useGenerateRecommended = () => {
    const mutation = useMutation<any, unknown, { jobId: string }>(({ jobId }) =>
    fetch(`${BE_URL}/jobs/${jobId}/recommended/generate`, {
      method: "POST",
    }).then((res) => res.json())
  );
  return mutation;
}