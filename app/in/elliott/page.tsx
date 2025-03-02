import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

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
                <div>Content</div>
              </CardContent>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
