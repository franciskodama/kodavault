import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Transactions() {
  return (
    <Card className='w-full'>
      <div className='flex flex-col justify-between h-full'>
        <div className='flex flex-col'>
          <CardHeader>
            <CardTitle className='capitalize flex items-center justify-between'>
              <span>{`Latest Transactions`}</span>
              <span className='text-3xl'>💸</span>
            </CardTitle>
            <CardDescription className='text-xs'>
              What have you been doing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <table className='w-full text-left'>
              <thead>
                <tr>
                  <th>Asset</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>BTC</td>
                  <td>0.35</td>
                  <td>40.000</td>
                  <td>15.12.2023</td>
                  <td className='text-white bg-red-500 rounded-[2px] w-[8em]'>
                    Too much
                  </td>
                </tr>
                <tr>
                  <td>BTC</td>
                  <td>0.35</td>
                  <td>40.000</td>
                  <td>15.12.2023</td>
                  <td className='text-slate-500 bg-yellow-500 rounded-[2px] w-[8em]'>
                    Too less
                  </td>
                </tr>
                <tr>
                  <td>BTC</td>
                  <td>0.35</td>
                  <td>40.000</td>
                  <td>15.12.2023</td>
                  <td className='text-white bg-blue-500 rounded-[2px] w-[8em]'>
                    Perfect
                  </td>
                </tr>
              </tbody>
            </table>

            {/* {sortedArray.map((item) => (
              <div key={item.value} className='flex justify-between'>
                <h3>{item.value}</h3>
                <div className='flex'>
                  <p className='w-[8ch] text-right mr-4'>{`${numberFormatterNoDecimals.format(
                    item.total
                  )}`}</p>
                  <p
                    className={`text-white w-[8ch] px-1 m-1 text-center rounded-[2px] ${
                      (item.total / total) * 100 > 50
                        ? 'bg-red-500'
                        : 'bg-green-500'
                    }`}
                  >{`${numberFormatter.format(
                    (item.total / total) * 100
                  )}%`}</p>
                </div>
              </div>
            ))} */}
          </CardContent>
        </div>
        {/* <CardFooter className='flex justify-between text-sm text-slate-500 font-medium bg-slate-50 m-1 p-2'>
          <h3>Total</h3>
          {numberFormatterNoDecimals.format(
            totalArray.reduce((sum: number, item) => sum + item.total, 0)
          )}
        </CardFooter> */}
      </div>
    </Card>
  );
}
