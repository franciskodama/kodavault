import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { thousandFormatter } from '@/lib/utils';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

type chartData = {
  name: string;
  value: number;
};

export default function CryptoChartPie({
  chartData,
}: {
  chartData: chartData[];
}) {
  // https://recharts.org/en-US/api/PieChart
  // https://recharts.org/en-US/api/Tooltip#active

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
                      outerRadius={150}
                      // fill='#8884d8'
                      labelLine={false}
                      label
                      legendType='circle'
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={getColor(entry.name)}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      itemStyle={{
                        backgroundColor: '#DDF906',
                        fontStyle: 'bold',
                      }}
                      wrapperStyle={{
                        borderRadius: '2px',
                        border: '1px solid #000',
                      }}
                      contentStyle={{
                        borderRadius: '2px',
                        backgroundColor: '#DDF906',
                      }}
                      labelStyle={{
                        color: 'blue',
                        fontSize: '20px',
                      }}
                      formatter={thousandFormatter}
                      active={true}
                      viewBox={{ x: 0, y: 0, width: 400, height: 400 }}
                    />
                    {/* https://recharts.org/en-US/api/Tooltip#formatter */}
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

// const getColor = (name: string) => {
//   let color = '#FFFFFF';

//   switch (name) {
//     case 'Ledger':
//       color = '#000000';
//       break;
//     case 'Trezor':
//       color = '#00C49F';
//       break;
//     case 'Binance':
//       color = '#FFBB28';
//       break;
//     case 'Bybit':
//       color = '#daf700';
//       break;
//     case 'Crypto.com\n':
//       color = '#00dcfe';
//       break;
//     case 'Gate.io':
//       color = '#0088FE';
//       break;
//     default:
//       color = '#fe00dc';
//       break;
//   }

//   return color;
// };

const getColor = (name: string) => {
  let color = '#FFFFFF';

  switch (name) {
    case 'Binance':
      color = '#F3BA2F';
      break;
    case 'Bybit':
      color = '#DDF906';
      break;
    case 'Gate.io':
      color = 'rgb(239 68 68)';
      break;
    case 'Crypto.com':
      color = '#0033A0';
      break;
    case 'Ledger':
      color = 'hsl(222.2 47.4% 11.2%)';
      break;
    case 'Trezor':
      color = 'rgb(34 197 94)';
      break;
    case 'BingX':
      color = '#2D70B7';
      break;
    case 'MetaMask':
      color = '#F6851B';
      break;
    default:
      color = '#fe00dc'; // Default color
      break;
  }

  return color;
};
