import { FileDrop } from "../../components/FileDrop"
import { PageWithNavbar } from "../../layouts/PageWIthNavbar"

export const Home = () => {
    return (
        <PageWithNavbar>
            <h1 className='text-3xl font-bold mb-8'>Home</h1>
            <FileDrop />
        </PageWithNavbar>
    )
}