import { Link, useLocation, useParams } from "react-router-dom";
import { DocumentIcon, HomeIcon, JobIcon } from "../assets/icons";
import { useJobQuery } from "../queries/useJobQuery";

export const JobSidebar = () => {
  const { jobId } = useParams();
  const { data } = useJobQuery(jobId ?? "");
  return (
    <div className="h-screen border-l-2 w-64 border-slate-900 bg-slate-800 pt-12 text-slate-100 px-4">
      <div className="text-slate-100 font-semibold text-xl pb-4">{data?.name}</div>
      <div className="flex flex-col">
        <LinkItem text="General" to="general" />
        <LinkItem text="Resumes" to="resumes" />
        <LinkItem text="Recommended" to="recommended" />
        <LinkItem text="Rejected" to="rejected" />
      </div>
    </div>
  );
};

type LinkItemProps = {
  text: string;
  to: string;
};

const LinkItem = (p: LinkItemProps) => {
  const {pathname} = useLocation();
  const { jobId } = useParams();
  const active = pathname.split("/")[3] === p.to;
  const to = `/jobs/${jobId}/${p.to}`;
  const activeStyles = "text-slate-100 bg-slate-800 font-semibold";
  const inactiveStyles = "text-slate-300 bg-slate-800 font-medium";
  return (
    <Link
      className={`flex flex-row py-2 rounded ${active ? activeStyles : inactiveStyles}`}
      to={to}
    >
      {p.text}
    </Link>
  );
};
