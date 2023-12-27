import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { AssetReducedWithAth } from '../../lib/types';
import AthTable from './AthTable';
import { currencyFormatter, numberFormatterNoDecimals } from '../../lib/utils';

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
      <Card>
        <div className='flex flex-col justify-between'>
          <div className='flex flex-col'>
            <CardHeader>
              <CardTitle className='capitalize flex items-center justify-between'>
                <span>Crypto ATH Estimation</span>
                <span className='text-3xl'>{emoji}</span>
              </CardTitle>
              <CardDescription className='text-xs'>
                {description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {athAssets.length > 0 ? (
                <div>
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
