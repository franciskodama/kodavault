import { SentimentType } from '@/lib/types';
import MessageInTable from '@/components/common/MessageInTable';
import { SentimentInteractions } from './sentiment-interactions';

export function Sentiment({ sentiments }: { sentiments: SentimentType[] }) {
  return (
    <>
      {sentiments.length > 0 ? (
        <SentimentInteractions sentiments={sentiments} />
      ) : (
        <div className='mt-8'>
          <MessageInTable
            image={'/dylan-severance.webp'}
            objectPosition={'50% 10%'}
            alt={'Superman looking something'}
            title={'No sentiment links yet!'}
            subtitle={
              'Start adding your favorite Coinalyze sentiment links to stay ahead of the market!'
            }
            buttonCopy={''}
            hasNoButton={true}
            formTitle={'Add a new Sentiment'}
            formSubtitle={
              'Add a Coinalyze URL to track market sentiment for your favorite coins.'
            }
          />
        </div>
      )}
    </>
  );
}
