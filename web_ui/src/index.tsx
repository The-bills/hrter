import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { Home } from "./views/Home/Home";
import { ResumeList } from "./views/ResumeList/ResumeList";
import { Resume } from "./views/Resume/Resume";
import { QueryClient, QueryClientProvider } from "react-query";
import { Job } from "./views/Job/Job";
import { ResumeNew } from "./views/ResumeNew/ResumeNew";
import { JobList } from "./views/JobList/JobList";
import { JobResumes } from "./views/JobResumes/JobResumes";
import { JobRecommended } from "./views/JobRecommended/JobRecommended";
import { JobGeneral } from "./views/JobGeneral/JobGeneral";
import { NotFound } from "./views/NotFound/NotFound";

const resumePaths = [
  {
    path: "/resumes",
    element: <ResumeList />,
  },
  {
    path: "/resumes/new",
    element: <ResumeNew />,
  },
  {
    path: "/resumes/:resumeId",
    element: <Resume />,
  },
]

const jobPaths = [
  {
    path: "/jobs",
    element: <JobList />,
  },
  {
    path: "/jobs/:jobId",
    element: <Job />,
  },
  {
    path: "/jobs/:jobId/general",
    element: <JobGeneral />,
  },
  {
    path: "/jobs/:jobId/resumes",
    element: <JobResumes />,
  },
  {
    path: "/jobs/:jobId/recommended",
    element: <JobRecommended />,
  },
]

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  ...resumePaths,
  ...jobPaths,
  {
    path: "/*",
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
          <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
