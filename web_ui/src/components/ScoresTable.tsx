import Skeleton from "react-loading-skeleton";

type Props = {
  data: any;
  isLoading?: boolean | null;
};

export const ScoresTable = (p: Props) => {
  const scores = Object.keys(p.data ?? {}).map((key) => [key, p.data[key]]);

  const renderLoader = () =>
    Array.from({ length: 8 }).map((_, i) => (
      <tr>
        <td>
          <Skeleton count={1} />
        </td>
        <td>
          <Skeleton count={1} />
        </td>
      </tr>
    ));

  return (
    <table className="w-full">
      <tr>
        <th className="text-left">Skill</th>
        <th className="text-right">Value</th>
      </tr>
      {p.isLoading && renderLoader()}
      {!p.isLoading && scores.map(([key, value]) => (
        <tr>
          <td>{key}</td>
          <td className="text-right">{value}</td>
        </tr>
      ))}
    </table>
  );
};
