'use client';

import { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';

function getRandomNumber() {
  return Math.random() * 100;
}

export function getData() {
  return [
    ['Label', 'Value'],
    ['Goal', getRandomNumber()],
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

export function GoalGauge() {
  const [data, setData] = useState(getData);

  useEffect(() => {
    const id = setInterval(() => {
      setData(getData());
    }, 3000);

    return () => {
      clearInterval(id);
    };
  });

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
