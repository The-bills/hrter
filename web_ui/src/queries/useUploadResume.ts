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

  const mutation = useMutation<Resume, unknown, { file: Blob, name: string }>(({ file, name }) =>
    fetch(`${BE_URL}/resumes/`, {
      method: "POST",
      body: getBody(file, name),
    }).then((res) => res.json())
  );

  return mutation;
};
