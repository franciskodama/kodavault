import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { numberFormatterNoDecimals, getTotalByKey } from '../lib/utils';
import { Asset } from '../lib/types';

export const CardTotal = ({
  assets,
  customKey,
}: {
  assets: Asset[];
  customKey: string;
}) => {
  const totalArray = getTotalByKey(assets, customKey);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{`Total By ${customKey}`}</CardTitle>
        <CardDescription>{`Total By ${customKey}`}</CardDescription>
      </CardHeader>
      <CardContent>
        {totalArray.map((item) => (
          <div key={item.value}>
            <h3>{item.value}</h3>
            <p>{`${numberFormatterNoDecimals.format(item.total)}`}</p>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <h3>Total</h3>
        <br />
        {totalArray.reduce((sum: number, item) => sum + item.total, 0)}
      </CardFooter>
    </Card>
  );
};

// {
//     id: '761959',
//     asset: 'GLXY',
//     qtd: '200.0000',
//     wallet: 'Wealthsimple',
//     created_at: '2023-08-27',
//     type: 'Stock',
//     uid: 'fk@fkodama.com',
//     subtype: 'Stock-CAD',
//     currency: 'CAD',
//     account: 'Investment',
//     exchange: 'TO',
//     price: '7.63',
//     total: '1,526.00'
//   }
