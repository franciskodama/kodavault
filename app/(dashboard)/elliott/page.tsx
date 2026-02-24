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
    <div className='flex flex-col w-full gap-2 px-8 sm:p-0'>
      <div className='flex flex-col sm:flex-row justify-between items-end mb-10 px-4 sm:px-0'>
        <div className='flex items-center gap-4 mt-8'>
          <div className='w-1 h-10 bg-[#22C55E] rounded-lg' />
          <div className='flex flex-col'>
            <p className='text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 leading-none mb-1'>
              Strategy Hub
            </p>
            <h1 className='text-xl font-bold text-slate-900 tracking-tight leading-none'>
              Elliott Perspective
            </h1>
          </div>
        </div>
      </div>

      <div className='w-full'>
        <Card>
          <div className='flex flex-col justify-between'>
            <div className='flex flex-col'>
              <CardHeader>
                <CardDescription className='text-xs'>
                  Decoding psychology, enhancing risk-return.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <ul className='my-8'>
                    <div className='text-sm font-semibold mb-2 uppercase tracking-wider text-slate-500'>
                      Key Takeaways
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
