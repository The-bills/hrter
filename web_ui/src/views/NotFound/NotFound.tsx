import { PageWithNavbar } from "../../layouts/PageWIthNavbar";

export const NotFound = () => {
  return (
    <PageWithNavbar>
      <div className="flex flex-col items-center justify-center h-screen pb-20">
        <h1 className="text-3xl font-bold">Page Not Found</h1>
        <button className="mt-2 text-xl italic text-blue-900" onClick={() => window.history.back()}> Go Back </button>
      </div>
    </PageWithNavbar>
  );
};
