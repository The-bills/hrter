import { Link, useNavigate } from "react-router-dom";
import { useJobListQuery } from "../../../queries/useJobListQuery";
import { Job } from "../../../types/job";

export const JobPreview = () => {
  const { data } = useJobListQuery();
  const navigate = useNavigate()
  return (
    <div className="bg-slate-100 rounded-md max-h-full overflow-y-hidden flex flex-col shadow">
      <div className="flex flex-row px-4 py-4 shadow">
        <span className="font-bold text-lg">Open Jobs</span>
        <button
        className="ml-auto self-center border rounded pt-1 pr-2 pb-1 pl-2 text-sm font-semibold bg-slate-700 text-slate-100"
        onClick={()=>navigate('/jobs/new')}
        >Add</button>
      </div>
      <div className="width-max overflow-y-scroll max-h-full px-4 flex-1">
        {data?.map((resume) => (
          <ListRow key={resume.id} {...resume} />
        ))}
      </div>
    </div>
  )
}

export const ListRow = (p: Job) => {
  return (
        <Link to={`/jobs/${p.id}/general`} className='flex border-b mt-1 items-center p-2'>
            <div className='text-sm font-semibold'>{p.name}</div>
        </Link>
  )

}
