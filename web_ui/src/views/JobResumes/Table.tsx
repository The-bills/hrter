import { useNavigate, useParams } from "react-router-dom";
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
export const Table = (p: Props) => {
  const { data } = useSubmissionListQuery(p.jobId);

  return (
    <div className="bg-slate-100 rounded-md max-h-full flex flex-col overflow-hidden">
      <table className="flex-1 overflow-y-scroll px-4">
        <tr className="border-b-2">
          <th></th>
          {["Name", "Score", "Added", "Status"].map((header) => (
            <th className="text-left font-medium text-slate-500 py-2 px-4">
              {header}
            </th>
          ))}
        </tr>
        {data?.map((submission) => (
          <Row {...submission} />
        ))}
      </table>
    </div>
  );
};

type RowProps = Submission;

const Row = (p: RowProps) => {
  const { data } = useResumeQuery(p.resume_id);
  const tdStyles = "py-2 px-4";
  const navigate = useNavigate()

  return (
    <tr className="border-b text-base">
      <td className={tdStyles}>
        <input type="checkbox" className="h-4 w-4" />
      </td>
      <td className={tdStyles}><span className='cursor-pointer' onClick={()=>navigate(`/resumes/${data?.id}`)}>{data?.name}</span></td>
      <td className={tdStyles}>{(100 - 10 * p.chroma_distance).toFixed(1)}</td>
      <td className={tdStyles}>{formatDate(new Date(p.created_at))}</td>
      <td className={tdStyles}>Active</td>
    </tr>
  );
};
