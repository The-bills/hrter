import { useNavigate, useParams } from "react-router-dom";
import { PageWithNavbar } from "../../layouts/PageWIthNavbar";
import "react-loading-skeleton/dist/skeleton.css";
import { useJobQuery } from "../../queries/useJobQuery";
import { formatDate } from "../../utils/date";
import { ScoresTable } from "../../components/ScoresTable";
import { useGetRecommended } from "../../queries/useGetRecommended";
import { JobPageWithNavbar } from "../../layouts/JobPageWithNavbar";
import { Submission } from "../../types/submission";
import { useResumeQuery } from "../../queries/useResumeQuery";
import { useGetRecommendation } from "../../queries/useGetRecommendation";
import { useGenerateRecommended } from "../../queries/useGenerateRecommended";

export const JobRecommended = () => {
  const { jobId } = useParams();
  const { data } = useJobQuery(jobId ?? "");
  const { data: recommended } = useGetRecommended(jobId ?? "");
  const temp = useGenerateRecommended();
  const buttonStyles = "bg-slate-700 text-slate-100 rounded-md py-1 px-2";
  const handleGenerate = () => {
    if (!jobId) return;
    temp.mutate({ jobId });
  };

  return (
    <JobPageWithNavbar className="flex flex-col max-h-screen">
      <div className="bg-slate-100 p-5 mb-8 rounded-md flex">
        <h1 className="text-3xl font-semibold">Recommendations</h1>
        <button className={buttonStyles + " ml-auto"} onClick={handleGenerate}>
          Generate
        </button>
      </div>
      <div className="bg-slate-100 rounded-md flex">
        <table className="flex-1 overflow-y-scroll px-4">
          <tr className="border-b-2">
            {["", "Name", "Reason"].map((header) => (
              <th className="text-left font-medium text-slate-500 py-2 px-4">
                {header}
              </th>
            ))}
          </tr>
          {recommended?.map((submission) => (
            <Row {...submission} />
          ))}
        </table>
      </div>
    </JobPageWithNavbar>
  );
};

type RowProps = Submission;

const Row = (p: RowProps) => {
  const { data: resume } = useResumeQuery(p.resume_id);
  const { data: recommendation } = useGetRecommendation(p.job_id, p.id, true);
  const tdStyles = "py-2 px-4";

  return (
    <tr className="border-b text-base">
      <td className={tdStyles}>
        <input type="checkbox" className="h-4 w-4" />
      </td>
      <td className={tdStyles}>{resume?.name}</td>
      <td className={tdStyles}>{recommendation?.reason}</td>
    </tr>
  );
};
