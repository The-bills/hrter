import { useMemo } from "react"
import { AxisOptions, Chart } from "react-charts"

type Props = {
  className?: string
}
export const UsageChart = (p: Props) => {
  const data = useMemo(()=> [
  {
       label: 'Total Tokens Used',
       data: [
         {
           date: new Date('2024-02-20'),
           stars: 30.4,
         },
         {
           date: new Date('2024-02-28'),
           stars: 35.4,
         },
         {
           date: new Date('2024-03-02'),
           stars: 50.4,
         },
         {
           date: new Date('2024-03-07'),
           stars: 60.4,
         },
         {
           date: new Date('2024-03-12'),
           stars: 70.4,
         },
         {
           date: new Date('2024-03-17'),
           stars: 75.4,
         },
       ],
     },
  ], [])

const primaryAxis = useMemo(
     (): AxisOptions<any> => ({
       getValue: datum => datum.date,
       
     }),
     []
   )
 
   const secondaryAxes = useMemo(
     (): AxisOptions<any>[] => [
       {
         getValue: datum => datum.stars,
       },
     ],
     []
   )

  return (
    <div className={p.className}>
    <div className="text-sm">Token usage</div>
    <div className="font-bold text-lg">75.4k</div>
        <div
          style={{
            minHeight: "200px",
            marginBottom: "20px"
          }}
        >
          <Chart
            options={{
              data,
              primaryAxis,
              secondaryAxes,
            }}
          />
        </div>
    </div>
  )
}
