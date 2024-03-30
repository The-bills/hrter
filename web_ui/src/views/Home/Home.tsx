import { PageWithNavbar } from "../../layouts/PageWIthNavbar"
import { JobPreview } from "./components/JobsPreview"
import { Tile } from "./components/Tile"
import { UsageChart } from "./components/UsageChart"

export const Home = () => {
    return (
        <PageWithNavbar className="">
          <div className="grid grid-cols-4 grid-rows-2 gap-4 mb-4">
            <UsageChart className="col-span-2 row-span-2 bg-slate-100 rounded-md p-4" />
            <Tile title="New Resumes" value={3} icon={null} subtitle="*Last 24h" />
            <Tile title="Open Jobs" value={2} icon={null} />
            <Tile title="Total Resumes" value={35} icon={null} />
            <Tile title="Open Recommendations" value={7} icon={null} />
          </div>
          <JobPreview />
        </PageWithNavbar>
    )
}
