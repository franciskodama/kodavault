import MessageInTable from '@/components/common/MessageInTable';
import { AlertType } from '@/lib/types';
import { AlertInteractions } from './alert-interactions';

export function Alert({ alerts }: { alerts: AlertType[] }) {
  return (
    <>
      {alerts.length > 0 ? (
        <div>
          <AlertInteractions alerts={alerts} />
        </div>
      ) : (
        <>
          <div className='mt-32'>
            <MessageInTable
              image={'/dylan-severance.webp'}
              objectPosition={'50% 10%'}
              alt={'Dylan searching something'}
              title={'No alerts saved yet!'}
              subtitle={
                'Start adding your alerts to be notified when a specific price is reached.'
              }
              buttonCopy={''}
              hasNoButton={true}
              formTitle={''}
              formSubtitle={''}
            />
          </div>
        </>
      )}
    </>
  );
}
