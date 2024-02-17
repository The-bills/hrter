import { Link, useLocation } from "react-router-dom";
import { DocumentIcon, HomeIcon, JobIcon, SettingsIcon } from "../assets/icons";

export const Sidebar = () => {
  return (
    <div className="flex flex-col h-screen bg-slate-900 pt-12 pb-12">
      <div className="flex flex-col flex-1 text-slate-400 font-semibold">
        <LinkItem icon={<HomeIcon />} to="/" />
        <LinkItem icon={<DocumentIcon />} to="/resumes" />
        <LinkItem icon={<JobIcon />} to="/jobs" />
      </div>
      <div className="flex flex-col text-slate-400 font-semibold">
        <LinkItem icon={<SettingsIcon />} to="/settings"/>
      </div>
    </div>
  );
};

type LinkItemProps = {
    icon: any;
    to: string;
    className?: string;
}
const LinkItem = (p: LinkItemProps) => {
  const { pathname } = useLocation();
  const active = p.to.split("/")[1] == pathname.split("/")[1];
  const activeStyles = "text-slate-100 bg-slate-800";
  return (
      <Link className={`p-3 ${active ? activeStyles : ""} ${p.className}`} to={p.to}>
        {p.icon}
      </Link>
  );
};
