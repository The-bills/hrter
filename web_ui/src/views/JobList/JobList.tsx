import { PageWithNavbar } from "../../layouts/PageWIthNavbar"
import { useJobListQuery } from "../../queries/useJobListQuery"
import { ListRow } from "./ListRow"

export const JobList = () => {
    const {data} = useJobListQuery()
    return (
        <PageWithNavbar>
            <h1 className='text-3xl font-bold'>Jobs</h1>
            <div className='mt-8  width-max'>
                {data?.map(job => (
                    <ListRow key={job.id} {...job} />
                ))}
            </div>
        </PageWithNavbar>
    )
}