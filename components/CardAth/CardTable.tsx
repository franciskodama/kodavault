import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AssetReducedWithAth } from '../../app/lib/types';
import AthTable from './AthTable';

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
        </div>
      </Card>
    </div>
  );
};
