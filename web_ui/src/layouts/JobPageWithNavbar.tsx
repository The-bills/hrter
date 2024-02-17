import { JobSidebar } from "../components/JobSidebar"
import { Sidebar } from "../components/Sidebar"

export const JobPageWithNavbar = (p: { children: React.ReactNode, className?: string }) => (
    <div className='flex flex-row bg-slate-200 max-h-screen'>
        <Sidebar />
        <JobSidebar />
        <div className={`flex-1 p-10 ${p.className} overflow-y-scroll`}>{p.children}</div>
    </div>
)

