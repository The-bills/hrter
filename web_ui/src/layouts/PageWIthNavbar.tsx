import { Sidebar } from "../components/Sidebar"

export const PageWithNavbar = (p: { children: React.ReactNode, className?: string }) => (
    <div className='flex flex-row bg-slate-200'>
        <Sidebar />
        <div className={`flex-1 p-10 ${p.className}`}>{p.children}</div>
    </div>
)
