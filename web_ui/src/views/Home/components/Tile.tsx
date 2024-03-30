type Props = {
  title: string
  subtitle?: string
  value: string | number
  icon: any
}
export const Tile = (p: Props) => {
  return (
    <div className="bg-slate-100 p-4 rounded-md flex flex-col">
    <div className="text-md font-semibold">{p.title}</div>
    <div className="text-lg font-bold">{p.value}</div>
    <div className="text-sm mt-auto">{p.subtitle}</div>
    </div>
  ) 
}
