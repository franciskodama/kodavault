import { Loading } from '@/components/Loading';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import MessageInTable from '@/components/MessageInTable';
import { CryptoWithAthAndProjections } from '@/lib/types';
import { DataTable } from './data-table';
import { columns } from './columns';

export default function Projections({
  cryptosWithATHsAndProjections,
}: {
  cryptosWithATHsAndProjections: CryptoWithAthAndProjections[];
}) {
  if (!cryptosWithATHsAndProjections) {
    return <Loading />;
  }

  const sortedAssetsWithProjections: CryptoWithAthAndProjections[] =
    cryptosWithATHsAndProjections.sort(
      (a: CryptoWithAthAndProjections, b: CryptoWithAthAndProjections) => {
        return Number(b.projectionXPotential) - Number(a.projectionXPotential);
      }
    );

  return (
    <div className='flex flex-col w-full gap-2'>
      {sortedAssetsWithProjections?.length > 0 ? (
        <div className='w-full'>
          <Card>
            <div className='flex flex-col justify-between'>
              <div className='flex flex-col'>
                <CardHeader>
                  <CardTitle className='capitalize flex items-center justify-between'>
                    <span>Crypto Projections</span>
                    <span className='text-3xl'>🔮</span>
                  </CardTitle>
                  <CardDescription className='text-xs'>
                    Projections made by Analystis or your own
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <DataTable
                      columns={columns}
                      data={sortedAssetsWithProjections}
                      // totals={totals}
                    />
                  </div>
                </CardContent>
              </div>
              <CardFooter className='flex m-1 py-2 px-10 justify-between text-sm text-slate-500 font-medium bg-slate-50'>
                <h3>Total</h3>
                {/* {currencyFormatter(athTotal)} */}
              </CardFooter>
            </div>
          </Card>
        </div>
      ) : (
        <MessageInTable
          image={'/looking-weird.webp'}
          objectPosition={'50% 5%'}
          alt={'I am broke'}
          title={'Hey, the blockchain’s waiting for you!'}
          subtitle={
            'Start stacking those coins and get ready to explore the crypto universe! To the moon! 🚀'
          }
          buttonCopy={'Add a Crypto Asset'}
          hasNoButton={false}
          formTitle={'Add a new Asset'}
          formSubtitle={'Add a New Asset and expand your investment portfolio.'}
        />
      )}
    </div>
  );
}
