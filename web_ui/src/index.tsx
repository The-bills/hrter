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
]

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  ...resumePaths,
  ...jobPaths
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
          <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
