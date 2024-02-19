import { Sidebar } from "../../components/Sidebar";
import { TextInput } from "../../components/Input";
import { useState } from "react";
import { FileDrop } from "../../components/FileDrop";
import { useUploadResume } from "../../queries/useUploadResume";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Textarea } from "../../components/Textarea";
import { useCreateJob } from "../../queries/useCreateJob";

export const JobNew = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState('');
  const { mutateAsync, isLoading } = useCreateJob();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams()

  const handleSave = async () => {
    if (!name || !description) return;
    const res = await mutateAsync({ name, description });
    navigate(`/jobs/${res.id}/general`);
  };

  return (
    <div className="flex items-stretch h-screen">
      <Sidebar />
      <div className="flex-1 p-16">
        <h1 className="text-3xl font-bold">Create new job</h1>
        <TextInput
          label="Name"
          value={name}
          onChange={setName}
          className="mt-8 max-w-2xl"
        />
        <Textarea
          label="Description"
          placeholder="Job description..."
          value={description}
          onChange={setDescription}
          className="mt-8 max-w-2xl"
        />
        <button
          className="mt-4 bg-slate-700 text-white px-4 py-2 rounded-md cursor-pointer"
          onClick={handleSave}
          disabled={isLoading || !name || !description}
        >
          {isLoading ? "Uploading..." : "Add"}
        </button>
      </div>
    </div>
  );
};
