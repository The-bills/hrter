import { useNavigate } from "react-router-dom";
import { PageWithNavbar } from "../../layouts/PageWIthNavbar";
import { useJobListQuery } from "../../queries/useJobListQuery";
import { ListRow } from "./ListRow";

export const JobList = () => {
  const { data } = useJobListQuery();
  const navigate = useNavigate();
  return (
    <PageWithNavbar>
      <div className="flex">
        <h1 className="text-3xl font-bold">Jobs</h1>
        <button
          onClick={() => navigate("/jobs/new")}
          className="bg-slate-700 text-white px-4 py-2 rounded-md cursor-pointer ml-auto"
        >
          Create new job
        </button>
      </div>
      <div className="mt-8  width-max">
        {data?.map((job) => (
          <ListRow key={job.id} {...job} />
        ))}
      </div>
    </PageWithNavbar>
  );
};
