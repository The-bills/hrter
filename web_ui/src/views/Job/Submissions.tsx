import { useParams } from "react-router-dom";
import { PageWithNavbar } from "../../layouts/PageWIthNavbar";
import "react-loading-skeleton/dist/skeleton.css";
import { useJobQuery } from "../../queries/useJobQuery";
import { useSubmissionListQuery } from "../../queries/useSubmissionListQuery";
import { Submission } from "../../types/submission";
import { formatDate } from "../../utils/date";
import { useState } from "react";
import { useResumeQuery } from "../../queries/useResumeQuery";
import { useGetRecommended } from "../../queries/useGetRecommended";
import { useGetRecommendation } from "../../queries/useGetRecommendation";

type Props = {
  jobId?: string;
};
export const Submissions = (p: Props) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const { data: allData } = useSubmissionListQuery(p.jobId);
  const {data: recommendedData} = useGetRecommended(p.jobId ?? '')

  const data = [allData, recommendedData, allData][selectedTab]

  return (
    <div className="rounded-md max-h-full flex flex-col overflow-hidden">
      <div className=" bg-slate-100 flex gap-10 border-b-2">
        <h1 className={`font-bold cursor-pointer p-4 underline-offset-4 ${selectedTab === 0 && 'underline'}`} onClick={()=> setSelectedTab(0)}>Active</h1>
        <h1 className={`font-bold cursor-pointer p-4 underline-offset-4 ${selectedTab === 1 && 'underline'}`} onClick={()=> setSelectedTab(1)}>Recomended</h1>
        <h1 className={`font-bold cursor-pointer p-4 underline-offset-4 ${selectedTab === 2 && 'underline'}`} onClick={()=> setSelectedTab(2)}>All</h1>
      </div>
      <table className="bg-slate-100 flex-1 overflow-y-scroll mt-4">
        <tr className="border-b-2 pb-3 p-3">
          <th>Name</th>
          <th>Score</th>
          <th>Added</th>
          <th>Status</th>
          </tr>
      {data?.map((submission) => 
        <Row {...submission} check={selectedTab == 1} />
      )}
      </table>
    </div>
  );
};

type RowProps = Submission & {check: boolean};

const Row = (p: RowProps) => {
  const {data} = useResumeQuery(p.resume_id)
  const {data: recommendation} = useGetRecommendation(p.job_id, p.id, p.check)
  return (
    <tr className="border-b-2 pb-3 p-3">
      <td className="text-base font-semibold pb-1">{data?.name}</td>
      <td className="text-sm text-slate-700 pb-1">{Math.round(p.chroma_distance*10)}</td>
      <td className="text-sm text-slate-700">
        {formatDate(new Date(p.created_at))}
      </td>
      <td className="text-sm text-slate-700 pb-1">Pending</td>
      <td className="text-sm text-slate-700 pb-1">{recommendation?.reason}</td>
    </tr>
  );
};
