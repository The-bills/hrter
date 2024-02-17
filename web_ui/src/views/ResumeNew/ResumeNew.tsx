import { Sidebar } from "../../components/Sidebar";
import { TextInput } from "../../components/Input";
import { useState } from "react";
import { FileDrop } from "../../components/FileDrop";
import { useUploadResume } from "../../queries/useUploadResume";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export const ResumeNew = () => {
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | undefined>();
  const { mutateAsync, isLoading } = useUploadResume();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams()
  console.log(searchParams.get('jobId'))

  const handleSave = async () => {
    const jobId = searchParams.get('jobId')
    if (!name || !file || !jobId) return;
    const res = await mutateAsync({ file, name, jobId });
    navigate(`/resumes/${res.id}`);
  };

  return (
    <div className="flex items-stretch h-screen">
      <Sidebar />
      <div className="flex-1 p-16">
        <h1 className="text-3xl font-bold">Upload resume</h1>
        <TextInput
          label="Name"
          value={name}
          onChange={setName}
          className="mt-8 max-w-2xl"
        />
        <FileDrop className="mt-4" file={file} onUpload={setFile} />
        <button
          className="mt-4 bg-slate-700 text-white px-4 py-2 rounded-md cursor-pointer"
          onClick={handleSave}
          disabled={isLoading || !name || !file}
        >
          {isLoading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
};
