import { useMutation } from "react-query";
import BE_URL from "../BE_URL";
import { Resume } from "../types/resume";

export const useUploadResume = () => {
  const getBody = (file: Blob, name: string) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append('name', name);
    return formData;
  };

  const mutation = useMutation<Resume, unknown, { file: Blob, name: string, jobId: string }>(({ file, name, jobId }) =>
    fetch(`${BE_URL}/resumes/?job_id=${jobId}`, {
      method: "POST",
      body: getBody(file, name),
    }).then((res) => res.json())
  );

  return mutation;
};
