import { Link } from "react-router-dom"
import { Job } from "../../types/job"
import { formatDate } from "../../utils/date"

type Props = Job

export const ListRow = (p: Props) => {
    return (
        <div className='grid rows-2 border-b-2 p-5 mt-5 rounded-md bg-slate-100'>
            <div className='text-base font-semibold pb-1'>{p.name}</div>
            <div className='text-sm text-slate-700'>{formatDate(new Date(p.created_at))}</div>
            <Link to={`/jobs/${p.id}/general`} className='row-start-1 row-end-3 col-start-2 col-end-3 ml-auto self-center border rounded pt-1 pr-2 pb-1 pl-2 text-sm font-semibold'>
                View
            </Link>
        </div>
    )
}