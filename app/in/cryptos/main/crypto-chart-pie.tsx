import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Cell,
  LabelList,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
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
  const colors = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#ff42ef',
    '#42efff',
  ];

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
                      fill='#8884d8'
                      labelLine={false}
                      label
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          // fill={colors[index % colors.length]}
                          fill={getColor(entry.name)}
                        />
                      ))}
                    </Pie>
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

const getColor = (name: string) => {
  let color = '#FFFFFF';

  switch (name) {
    case 'Ledger':
      color = '#000000';
      break;
    case 'Trezor':
      color = '#00C49F';
      break;
    case 'Binance':
      color = '#FFBB28';
      break;
    case 'Bybit':
      color = '#daf700';
      break;
    case 'Crypto.com\n':
      color = '#00dcfe';
      break;
    case 'Gate.io':
      color = '#0088FE';
      break;
    default:
      color = '#fe00dc';
      break;
  }

  return color;
};
