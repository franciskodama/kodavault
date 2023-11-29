import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { AssetReducedWithAth } from '../../app/lib/types';
import AthTable from './AthTable';
import {
  currencyFormatter,
  numberFormatterNoDecimals,
} from '../../app/lib/utils';

export const CardTable = ({
  athAssets,
  emoji,
  description,
}: {
  athAssets: AssetReducedWithAth[];
  emoji?: string;
  description?: string;
}) => {
  const athTotal = athAssets.reduce(
    (sum: number, item: AssetReducedWithAth) => {
      const currentAthTotalNumber = Number(item.athTotalNumber);
      return sum + currentAthTotalNumber;
    },
    0
  );

  return (
    <div>
      <Card className=''>
        <div className='flex flex-col justify-between'>
          <div className='flex flex-col'>
            <CardHeader>
              <CardTitle className='capitalize flex justify-between'>
                <span>Crypto ATH Estimation</span>
                <span>{emoji}</span>
              </CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
              {athAssets.length > 0 ? (
                <div className='my-4'>
                  <AthTable athAssets={athAssets} />
                </div>
              ) : (
                <div className='my-32'>🙅🏻‍♀️ Not loaded yet</div>
              )}
            </CardContent>
          </div>
          <CardFooter className='flex justify-between text-sm text-slate-500 font-medium bg-slate-50 m-1 p-2'>
            <h3>Total</h3>
            {currencyFormatter(athTotal)}
          </CardFooter>
        </div>
      </Card>
    </div>
  );
};
