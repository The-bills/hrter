import { FileDrop } from "../../components/FileDrop"
import { PageWithNavbar } from "../../layouts/PageWIthNavbar"

export const Home = () => {
    return (
        <PageWithNavbar className="bg-slate-100">
            <h1 className='text-3xl font-bold mb-8'>Home</h1>
            <FileDrop />
        </PageWithNavbar>
    )
}