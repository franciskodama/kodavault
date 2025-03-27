import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import MarkdownTable from './table-markdown';
import HtmlTable from './table-html';

export default function Elliott() {
  return (
    <div className='flex flex-col w-full gap-2'>
      <div className='w-full'>
        <Card>
          <div className='flex flex-col justify-between'>
            <div className='flex flex-col'>
              <CardHeader>
                <CardTitle className='capitalize flex items-center justify-between'>
                  <span>Elliott Perspective</span>
                  <span className='text-3xl mr-4'>🧠</span>
                </CardTitle>
                <CardDescription className='text-xs'>
                  Decoding psychology, enhancing risk-return.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <ul className='my-8'>
                    <div className='text-sm font-semibold mb-2'>
                      🎗️ Key Takeaways
                    </div>
                    <li>
                      Be flexible in your Elliott Wave analysis. Market
                      conditions can change rapidly.
                    </li>
                    <li>
                      Do not rely solely on wave counts. Use multiple technical
                      indicators for confirmation.
                    </li>
                    <li>
                      Consider the larger timeframe trend to provide context.
                    </li>
                    <li>
                      Remember that Elliott wave analysis is a probabilistic
                      method, and not a guaranteed predictor of market movement.
                    </li>
                  </ul>
                </div>
                <HtmlTable />
              </CardContent>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
