import { useNavigate, useParams } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar";
import { TextInput } from "../../components/Input";
import { useState } from "react";
import { useResumeQuery } from "../../queries/useResumeQuery";
import { useDeleteCvQuery } from "../../queries/useDeleteCvQuery";
import { PageWithNavbar } from "../../layouts/PageWIthNavbar";
import { formatDate } from "../../utils/date";
import { useRetryResumeSummary } from "../../queries/useRetryResumeSummary";
import { useRetryResumeScores } from "../../queries/useRetryResumeScores";
import { ScoresTable } from "../../components/ScoresTable";
import { useStatusResumeSummary } from "../../queries/useStatusResumeSummary";
import Skeleton from "react-loading-skeleton";
import { useStatusResumeScores } from "../../queries/useStatusResumeScores";

export const Resume = () => {
  const { resumeId } = useParams();
  const { data, isLoading } = useResumeQuery(resumeId);
  const { mutate: retrySummary, isLoading: isSummaryUpdating } = useRetryResumeSummary();
  const { mutate: retryScores, isLoading: isScoresUpdating } = useRetryResumeScores();
  const {data: isSummaryProcessing} = useStatusResumeSummary(resumeId!, !isLoading && !data?.summary );
  const {data: isScoresProcessing} = useStatusResumeScores(resumeId!, !isLoading && !data?.scores );

  const isSummaryLoading = isLoading || isSummaryUpdating || (isSummaryProcessing && !data?.summary)
  const isScoresLoading = isLoading || isScoresUpdating || (isScoresProcessing && !data?.scores)

  const handleRetrySummary = () => retrySummary(resumeId!);
  const handleRetryScores = () => retryScores(resumeId!);

  const renderSummary = (summary?: string | null) => {
    if(!summary) return <div className="italic">Empty summary</div>
    const splited = summary.split("\\n");
    return splited.map((s) => <><div>{s}</div></>);
  }

  return (
    <PageWithNavbar className="flex flex-col max-h-screen">
      <div className="bg-slate-100 p-5 mb-8 rounded-md">
        <h1 className="text-3xl font-bold">{data?.name}</h1>
        <div className="">{formatDate(new Date(data?.created_at!))}</div>
      </div>

      <div className="grid grid-cols-3 gap-8 mb-8">
        <div className="col-span-2 bg-slate-100 rounded-md p-5">
          <div className="font-bold mb-2">Summary</div>
          <div className="mb-4">
            {!isSummaryLoading ? renderSummary(data?.summary) : <Skeleton count={6.3} />}
          </div>
        </div>
        <div className="bg-slate-100 rounded-md p-5">
          <ScoresTable data={data?.scores} isLoading={isScoresLoading} />
        </div>
      </div>
      <div className="flex gap-4">
        <button
          className="text-white p-2 rounded-md bg-slate-800"
          onClick={handleRetrySummary}
        >
          Retry Summary
        </button>
        <button
          className="text-white p-2 rounded-md bg-slate-800"
          onClick={handleRetryScores}
        >
          Retry Scores
        </button>
      </div>
    </PageWithNavbar>
  );
};
