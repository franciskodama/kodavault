"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lucide_react_1 = require("lucide-react");
const button_1 = require("@/components/ui/button");
const card_1 = require("@/components/ui/card");
function Notifications() {
    return (<>
      <div className='flex flex-col gap-2 flex-1'>
        <card_1.Card className=''>
          <div className='flex flex-col justify-between h-full'>
            <div className='flex flex-col'>
              <card_1.CardHeader>
                <card_1.CardTitle className='capitalize flex items-center justify-between'>
                  <span>{`Alert`}</span>
                  <span className='text-3xl'>🚨</span>
                </card_1.CardTitle>
                <card_1.CardDescription className='text-xs'>
                  Check this out!
                </card_1.CardDescription>
              </card_1.CardHeader>
              <card_1.CardContent className='relative'>
                <p className='my-2'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  elementum, diam id scelerisque volutpat, magna augue iaculis
                  felis, a vulputate justo diam non libero.
                </p>
                {/* <Image
          src='/goat.gif'
          width={100}
          height={100}
          alt='Logo Koda Vault'
          className='absolute bottom-0 right-10 rounded-md object-cover opacity-20'
        /> */}
              </card_1.CardContent>
            </div>
            <card_1.CardFooter className='flex justify-between text-sm text-slate-500 font-medium m-1 p-2'>
              <button_1.Button>
                <lucide_react_1.SirenIcon size={16} className='mr-2'/>
                Check now
              </button_1.Button>
            </card_1.CardFooter>
          </div>
        </card_1.Card>

        <card_1.Card className=''>
          <div className='flex flex-col justify-between h-full'>
            <div className='flex flex-col'>
              <card_1.CardHeader>
                <card_1.CardTitle className='capitalize flex items-center justify-between'>
                  <span>{`Almost there!`}</span>
                  <span className='text-3xl'>🤑</span>
                </card_1.CardTitle>
                <card_1.CardDescription className='text-xs'>
                  {`I'm proud of you!`}
                </card_1.CardDescription>
              </card_1.CardHeader>
              <card_1.CardContent className='relative'>
                <p className='my-2'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  elementum, diam id scelerisque volutpat, magna augue iaculis
                  felis, a vulputate justo diam non libero.
                </p>
                {/* <Image
          src='/mari.png'
          width={200}
          height={200}
          alt='Mari in the middle of a buch of money'
          className='absolute bottom-0 right-10 rounded-md object-cover opacity-[50%]'
        /> */}
              </card_1.CardContent>
            </div>
            <card_1.CardFooter className='flex justify-between text-sm text-slate-500 font-medium m-1 p-2'>
              <button_1.Button>
                <lucide_react_1.RocketIcon size={16} className='mr-2'/>
                Check now
              </button_1.Button>
            </card_1.CardFooter>
          </div>
        </card_1.Card>
      </div>
    </>);
}
exports.default = Notifications;
