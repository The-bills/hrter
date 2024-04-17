import { PageWithNavbar } from "../../layouts/PageWIthNavbar"
import { JobPreview } from "./components/JobsPreview"
import { ResumePreview } from "./components/ResumePreview"
import { Tile } from "./components/Tile"
import { UsageChart } from "./components/UsageChart"

export const Home = () => {
    return (
        <PageWithNavbar className="grid grid-cols-2 gap-8">
          <JobPreview />
          <ResumePreview />
        </PageWithNavbar>
    )
}
