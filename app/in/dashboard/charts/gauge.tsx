'use client';

import { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';

export function getData(goal: number, totalSoFar: number) {
  const percentage = Math.floor((totalSoFar / goal) * 100);

  return [
    ['Label', 'Value'],
    ['Goal', percentage],
  ];
}

export const options = {
  width: 400,
  height: 120,
  redFrom: 90,
  redTo: 100,
  yellowFrom: 75,
  yellowTo: 90,
  minorTicks: 5,
};

export function GoalGauge({ totalSoFar }: { totalSoFar: number }) {
  console.log('---  🚀 ---> | totalSoFar:', totalSoFar);

  const goal = 1500000;
  const [data, setData] = useState(getData(goal, totalSoFar));

  useEffect(() => {
    const id = setInterval(() => {
      setData(getData(goal, totalSoFar));
    }, 3000);

    return () => {
      clearInterval(id);
    };
  }),
    [totalSoFar];

  return (
    <div className='relative w-full h-full flex justify-center items-center'>
      <div className='z-0'>
        <Chart
          chartType='Gauge'
          width='100px'
          height='100px'
          data={data}
          options={options}
        />
      </div>
      <p className='absolute bottom-10 right-50 z-10 border-2 border-red-600 bg-black text-white'>
        %
      </p>
    </div>
  );
}
