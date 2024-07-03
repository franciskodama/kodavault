"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
const card_1 = require("@/components/ui/card");
const recharts_1 = require("recharts");
// https://recharts.org/en-US/guide/getting-started
function NetWorthEvolutionChart({ chartData, }) {
    return (<>
      <card_1.Card className='w-full'>
        <div className='flex flex-col justify-between h-full w-full'>
          <div className='flex flex-col w-full'>
            <card_1.CardHeader>
              <card_1.CardTitle className='capitalize flex items-center justify-between'>
                <span>{`Net Worth Evolution`}</span>
                <span className='text-3xl'>📈</span>
              </card_1.CardTitle>
              <card_1.CardDescription className='text-xs'>
                {`Track the progression of your net worth over time.`}
              </card_1.CardDescription>
            </card_1.CardHeader>
            <card_1.CardContent className='w-full'>
              <div className='w-full p-8'>
                <recharts_1.LineChart width={1000} height={300} 
    // data={chartData}
    margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
        }}>
                  {/* <CartesianGrid strokeDasharray='3 3' /> */}
                  <recharts_1.XAxis dataKey='created_at'/>
                  <recharts_1.YAxis />
                  <recharts_1.Tooltip />
                  <recharts_1.Legend />
                  {/* <Line
          type='monotone'
          dataKey='visit'
          stroke='#8884d8'
          strokeDasharray='5 5'
        /> */}
                  <recharts_1.Line type='monotone' dataKey='click' stroke='#82ca9d' strokeDasharray='3 4 5 2'/>
                </recharts_1.LineChart>
              </div>
            </card_1.CardContent>
          </div>
        </div>
      </card_1.Card>
    </>);
}
exports.default = NetWorthEvolutionChart;
