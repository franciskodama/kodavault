'use client';

import { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';

export function getData(totalSofar: number) {
  return [
    ['Label', 'Value'],
    ['Goal', 1500000 - totalSofar],
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

export function GoalGauge({ totalSofar }: { totalSofar: number }) {
  console.log('---  🚀 ---> | totalSofar:', totalSofar);
  const [data, setData] = useState(getData(totalSofar));

  useEffect(() => {
    const id = setInterval(() => {
      setData(getData(totalSofar));
    }, 3000);

    return () => {
      clearInterval(id);
    };
  }),
    [totalSofar];

  return (
    <Chart
      chartType='Gauge'
      width='100px'
      height='100px'
      data={data}
      options={options}
    />
  );
}
