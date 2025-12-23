'use client';

import React, { useEffect, useState } from 'react';

export const CoinCodexWidget = () => {
  const [src, setSrc] = useState('');

  useEffect(() => {
    const t = Math.round(Date.now() / (10 * 60 * 1000));
    
    const baseUrl = 'https://widget.coincodex.com/';
    const queryParams = new URLSearchParams({
      type: '4',
      ticker: 'top10',
      period: '1D',
      textColor: '000000',
      borderColor: 'dddddd',
      backgroundColor: 'ffffff',
      hoverColor: 'transparent',
      currency: 'USD',
      range: '1D',
      iniframe: 'true',
      t: t.toString()
    });

    setSrc(`${baseUrl}?${queryParams.toString()}`);
  }, []);

  if (!src) return null;

  return (
    <div
      id='coincodex-widget-container'
    >
      <iframe
        src={src}
        width="140%" 
        height="35px"
        scrolling="no"
        style={{ border: 'none', transform: 'scale(0.7)', transformOrigin: 'top left' }}
        title="CoinCodex Widget"
      />
    </div>
  );
};
