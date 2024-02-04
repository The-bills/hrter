import { PageWithNavbar } from "../../layouts/PageWIthNavbar";
import { useResumeListQuery } from "../../queries/useResumeListQuery";
import { ListRow } from "./ListRow";

export const ResumeList = () => {
  const { data } = useResumeListQuery();
  return (
    <PageWithNavbar>
      <h1 className="text-3xl font-bold">Resumes</h1>
      <div className="mt-8 width-max">
        {data?.map((cv) => (
          <ListRow key={cv.id} {...cv} />
        ))}
      </div>
    </PageWithNavbar>
  );
};
