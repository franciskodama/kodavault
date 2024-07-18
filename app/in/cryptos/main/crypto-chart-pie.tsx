import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
type chartData = {
  name: string;
  value: number;
};

export default function CryptoChartPie({
  chartData,
}: {
  chartData: chartData[];
}) {
  return (
    <>
      <Card className='w-full'>
        <div className='flex flex-col justify-between h-full w-full'>
          <div className='flex flex-col w-full'>
            <CardHeader>
              <CardTitle className='capitalize flex items-center justify-between'>
                <span>{`Wallet Share`}</span>
                <span className='text-3xl'>🍕</span>
              </CardTitle>
              <CardDescription className='text-xs'>
                {`Where is your money?`}
              </CardDescription>
            </CardHeader>
            <CardContent className='w-full'>
              <div className='w-full p-8'>
                <ResponsiveContainer width='100%' height={300}>
                  <PieChart width={800} height={800}>
                    <Pie
                      data={chartData}
                      dataKey='value'
                      nameKey='name'
                      cx='50%'
                      cy='50%'
                      outerRadius={90}
                      fill='#8884d8'
                    />

                    {/* <Pie
                      data={chartData}
                      dataKey='value'
                      nameKey='name'
                      cx='50%'
                      cy='50%'
                      innerRadius={100}
                      outerRadius={120}
                      fill='#82ca9d'
                      label
                    /> */}
                    <Tooltip
                      active={true}
                      viewBox={{ x: 0, y: 0, width: 400, height: 400 }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </>
  );
}
