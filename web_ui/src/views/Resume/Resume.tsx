import { useNavigate, useParams } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar";
import { TextInput } from "../../components/Input";
import { useState } from "react";
import { useResumeQuery } from "../../queries/useResumeQuery";
import { useDeleteCvQuery } from "../../queries/useDeleteCvQuery";
import { PageWithNavbar } from "../../layouts/PageWIthNavbar";
import { formatDate } from "../../utils/date";

export const Resume = () => {
  const { resumeId } = useParams();
  const { data } = useResumeQuery(resumeId);
  // const link = data?.filelink && `${BE_URL}/${data?.filelink}#toolbar=0&navpanes=0&scrollbar=0`
  const navigate = useNavigate();
  const scores = Object.keys(data?.scores ?? {}).map((key) => [
    key,
    data!.scores![key],
  ]);

  // const openFile = () =>{
  //     if(!link) return
  //     window.open(link, '_blank')
  // }

  return (
    <PageWithNavbar className="flex flex-col max-h-screen">
      <div className="bg-slate-100 p-5 mb-8 rounded-md">
        <h1 className="text-3xl font-bold">{data?.name}</h1>
        <div className="">{formatDate(new Date(data?.created_at!))}</div>
      </div>

      <div className="grid grid-cols-3 gap-8 mb-8">
        <div className="col-span-2 bg-slate-100 rounded-md p-5">
          <div className="font-bold mb-2">Summary</div>
          <div className="mb-4">{data?.summary}</div>
        </div>
        <div className="bg-slate-100 rounded-md p-5">
          <div className="font-bold mb-2">Scoring</div>
          <div className="mb-4">
            {scores.map(([key, value]) => (
              <div>
                {"-"}
                {key}: {value}
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWithNavbar>
  );
};
