import { useNavigate, useParams } from "react-router-dom"
import { PageWithNavbar } from "../../layouts/PageWIthNavbar"
import 'react-loading-skeleton/dist/skeleton.css'
import { useJobQuery } from "../../queries/useJobQuery"
import { formatDate } from "../../utils/date"
import { Submissions } from "./Submissions"
import { ScoresTable } from "../../components/ScoresTable"
import { useGetRecommended } from "../../queries/useGetRecommended"
import { JobPageWithNavbar } from "../../layouts/JobPageWithNavbar"

export const Job = () => {
    const { jobId } = useParams()
    const {data} = useJobQuery(jobId ?? '')
    const navigate = useNavigate()

    const handleNavigateNew = () => navigate(`/resumes/new`)
    return(
        <JobPageWithNavbar className="flex flex-col max-h-screen">
            <div className="bg-slate-100 p-5 mb-8 rounded-md">
                <h1 className='text-3xl font-bold'>{data?.name}</h1>
                <div className=''>{formatDate(new Date(data?.created_at!))}</div>
                <button className='' onClick={handleNavigateNew}>+</button>
            </div>

            <div className="grid grid-cols-3 gap-8 mb-8">
                <div className="col-span-2 bg-slate-100 rounded-md p-5">
                    <div className='font-bold mb-2'>Summary</div>
                    <div className='mb-4 text-justify'>{data?.summary}</div>
                </div>
                <div className="bg-slate-100 rounded-md p-5">
                <ScoresTable data={data?.scores} />
                </div>
            </div>

            <Submissions jobId={jobId}/>
        </JobPageWithNavbar>
    )
}