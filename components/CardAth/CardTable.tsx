import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AssetReducedWithAth } from '../../app/lib/types';
import AthTable from './AthTable';
import { numberFormatterNoDecimals } from '@/app/lib/utils';

export const CardTable = ({
  athAssets,
  emoji,
  description,
}: {
  athAssets: AssetReducedWithAth[];
  emoji?: string;
  description?: string;
}) => {
  return (
    <div>
      <Card className=''>
        <div className='flex flex-col justify-between'>
          <div className='flex flex-col'>
            <CardHeader>
              <CardTitle className='capitalize flex justify-between'>
                <span>ATH Estimation</span>
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
            {numberFormatterNoDecimals.format(
              athAssets.reduce(
                (sum: number, item) =>
                  Number(sum) + Number(item.athTotalEstimation),
                0
              )
            )}
          </CardFooter>
        </div>
      </Card>
    </div>
  );
};
