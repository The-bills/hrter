import { useParams } from "react-router-dom";
import { PageWithNavbar } from "../../layouts/PageWIthNavbar";
import "react-loading-skeleton/dist/skeleton.css";
import { useJobQuery } from "../../queries/useJobQuery";
import { useSubmissionListQuery } from "../../queries/useSubmissionListQuery";
import { Submission } from "../../types/submission";
import { formatDate } from "../../utils/date";
import { useState } from "react";
import { useResumeQuery } from "../../queries/useResumeQuery";

type Props = {
  jobId?: string;
};
export const Submissions = (p: Props) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const { data } = useSubmissionListQuery(p.jobId);

  return (
    <div className="bg-slate-100 rounded-md max-h-full flex flex-col overflow-hidden">
      <div className="flex gap-10 border-b-2">
        <h1 className={`font-bold cursor-pointer p-4 underline-offset-4 ${selectedTab === 0 && 'underline'}`} onClick={()=> setSelectedTab(0)}>Active</h1>
        <h1 className={`font-bold cursor-pointer p-4 underline-offset-4 ${selectedTab === 1 && 'underline'}`} onClick={()=> setSelectedTab(1)}>Recomended</h1>
        <h1 className={`font-bold cursor-pointer p-4 underline-offset-4 ${selectedTab === 2 && 'underline'}`} onClick={()=> setSelectedTab(2)}>All</h1>
      </div>
      <div className="flex-1 overflow-y-scroll">
      {data?.map((submission) => (
        <Row {...submission} />
      ))}
      </div>
    </div>
  );
};

type RowProps = Submission;

const Row = (p: RowProps) => {
  const {data} = useResumeQuery(p.resume_id)
  return (
    <div className="grid rows-2 border-b-2 pb-3 p-3">
      <div className="text-base font-semibold pb-1">{data?.name}</div>
      <div className="text-sm text-slate-700 pb-1">Score: {Math.round(p.chroma_distance*10)}</div>
      <div className="text-sm text-slate-700">
        {formatDate(new Date(p.created_at))}
      </div>
    </div>
  );
};
