import MessageInTable from '@/components/common/MessageInTable';
import { AlertType } from '@/lib/types';
import { AlertInteractions } from './alert-interactions';

export function Alert({ alerts }: { alerts: AlertType[] }) {
  //   const alertByCategory = alerts.reduce((acc: any, alert: any) => {
  //     if (!acc[alert.category]) {
  //       acc[alert.category] = [];
  //     }
  //     acc[alert.category].push(alert);
  //     return acc;
  //   }, {});

  return (
    <>
      {alerts.length > 0 ? (
        <div>test</div>
      ) : (
        <>
          <AlertInteractions alerts={alerts} />
          <div className='mt-8'>
            <MessageInTable
              image={'/dylan-severance.webp'}
              objectPosition={'50% 10%'}
              alt={'Superman looking something'}
              title={'No shortcuts saved yet!'}
              subtitle={
                'Start adding your favorite links and soon this space will be your go-to treasure chest of wisdom!'
              }
              buttonCopy={''}
              hasNoButton={true}
              formTitle={'Add a new Asset'}
              formSubtitle={
                'Add a New Asset and expand your investment portfolio.'
              }
            />
          </div>
        </>
      )}
    </>
  );
}
