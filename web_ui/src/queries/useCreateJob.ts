import { useMutation } from "react-query";
import BE_URL from "../BE_URL";
import { Resume } from "../types/resume";

type Body = {
  name: string,
  description: string
}

export const useCreateJob = () => {
  const mutation = useMutation<Resume, unknown, Body>((body) =>
    fetch(`${BE_URL}/jobs/`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      }
    }).then((res) => res.json())
  );

  return mutation;
};
