import { useNavigate, useParams } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import { JobPageWithNavbar } from "../../layouts/JobPageWithNavbar";
import { Table } from "./Table";

export const JobResumes = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const buttonStyles = "bg-slate-700 text-slate-100 rounded-md py-1 px-2";

  return (
    <JobPageWithNavbar className="flex flex-col max-h-screen">
      <div className="bg-slate-100 p-5 mb-8 rounded-md flex">
        <h1 className="text-3xl font-semibold">Submitted resumes</h1>
        <button
          className={buttonStyles + " ml-auto"}
          onClick={() => navigate("/resumes/new")}
        >
          Add Resume
        </button>
      </div>
      <Table jobId={jobId} />
    </JobPageWithNavbar>
  );
};
