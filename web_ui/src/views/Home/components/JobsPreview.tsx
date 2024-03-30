import { Link } from "react-router-dom";
import { useJobListQuery } from "../../../queries/useJobListQuery";
import { formatDate } from "../../../utils/date";

export const JobPreview = () => {
  const { data } = useJobListQuery();
  return (
    <div className="bg-slate-100 p-4 rounded-md">
    <span className="font-bold text-lg">Open Jobs</span>
      <div className="mt-2 width-max">
        {data?.map((job) => (
          <ListRow key={job.id} {...job} />
        ))}
      </div>
    </div>
  )
}

export const ListRow = (p: any) => {
  return (
        <div className='flex border-t pt-2 mt-2 items-center'>
            <div className='text-sm font-semibold'>{p.name}</div>
            <Link to={`/jobs/${p.id}/general`} className='ml-auto self-center border rounded pt-1 pr-2 pb-1 pl-2 text-sm font-semibold'>
                View
            </Link>
        </div>
  )

}
