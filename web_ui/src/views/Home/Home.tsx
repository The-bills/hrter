import { PageWithNavbar } from "../../layouts/PageWIthNavbar"
import { JobPreview } from "./components/JobsPreview"
import { ResumePreview } from "./components/ResumePreview"

export const Home = () => {
    return (
        <PageWithNavbar className="grid grid-cols-2 gap-8">
          <JobPreview />
          <ResumePreview />
        </PageWithNavbar>
    )
}
