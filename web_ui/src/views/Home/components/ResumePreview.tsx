import { Link, useNavigate } from "react-router-dom";
import { useResumeListQuery } from "../../../queries/useResumeListQuery";
import { Resume } from "../../../types/resume";

export const ResumePreview = () => {
  const { data } = useResumeListQuery();
  const navigate = useNavigate()
  return (
    <div className="bg-slate-100 rounded-md max-h-full overflow-y-hidden flex flex-col shadow">
      <div className="flex flex-row px-4 py-4 shadow">
        <span className="font-bold text-lg">Candidates</span>
        <button
        className="ml-auto self-center border rounded pt-1 pr-2 pb-1 pl-2 text-sm font-semibold bg-slate-700 text-slate-100"
        onClick={()=>navigate('/resumes/new')}
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

export const ListRow = (p: Resume) => {
  return (
        <Link to={`/resumes/${p.id}`} className='flex border-b mt-1 items-center p-2'>
            <div className='text-sm font-semibold'>{p.name}</div>
        </Link>
  )

}
