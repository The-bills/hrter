import { Link, useLocation } from "react-router-dom"
import { DocumentIcon, HomeIcon, JobIcon } from "../assets/icons"

export const Sidebar = () => {
    return (
        <div className='h-screen w-72  border-r-2 bg-slate-900 pt-12'>
            <div className='flex flex-col p-8 gap-2 text-slate-400 font-semibold'>
                <LinkItem icon={<HomeIcon />} text='Home' to='/' />
                <LinkItem icon={<DocumentIcon />} text='Resumes' to='/resumes' />
                <LinkItem icon={<JobIcon />} text='Jobs' to='/jobs' />
            </div>
        </div>
    )
}

const LinkItem = (p: { icon: any, text: string, to: string }) => {
   const location = useLocation()
   const active = location.pathname === p.to
   const activeStyles = 'text-slate-100 bg-slate-800'
   return (
        <div className={`flex flex-row p-2 rounded ${active ? activeStyles : ''}`}>
            {p.icon}
            <Link className='ml-2' to={p.to}>{p.text}</Link>
        </div>
   ) 
}