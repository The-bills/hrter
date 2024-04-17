import { Sidebar } from "../../components/Sidebar";
import { TextInput } from "../../components/Input";
import { useState } from "react";
import { FileDrop } from "../../components/FileDrop";
import { useUploadResume } from "../../queries/useUploadResume";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { PageWithNavbar } from "../../layouts/PageWIthNavbar";
import { useJobListQuery } from "../../queries/useJobListQuery";

export const ResumeNew = () => {
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | undefined>();
  const { mutateAsync, isLoading } = useUploadResume();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams()
  const {data: jobs} = useJobListQuery()
  const [selectedJobId, setSelectedJobId] = useState(searchParams.get('jobId'))

  const handleSave = async () => {
    const jobId = selectedJobId
    if (!name || !file || !jobId) return;
    const res = await mutateAsync({ file, name, jobId });
    navigate(`/resumes/${res.id}`);
  };

  console.log(selectedJobId)

  return (
  <PageWithNavbar className="">
        <h1 className="text-3xl font-bold mb-4">Upload resume</h1>
        <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-100 p-4 flex-1 rounded shadow">
        <TextInput
          label="Name"
          value={name}
          onChange={setName}
          className="max-w-2xl" 
        />
        <FileDrop className="mt-4 bg-white" file={file} onUpload={setFile} />
        <button
          className="mt-4 bg-slate-700 text-white px-4 py-2 rounded-md cursor-pointer"
          onClick={handleSave}
          disabled={isLoading || !name || !file}
        >
          {isLoading ? "Uploading..." : "Upload"}
        </button>
        </div>
        <div className="bg-slate-100 p-4 flex-1 rounded shadow flex flex-col">
        <div>Select Job</div>
         {jobs?.map(job => (
         <div>
            <input type="radio" id={job.id} name='jobId' value={job.id} checked={selectedJobId === job.id} onClick={()=>setSelectedJobId(job.id)} />
            <label htmlFor={job.id} className='ml-2'>{job.name}</label>
            </div>
         ))} 
        </div>
        </div>
    </PageWithNavbar>
  );
};
