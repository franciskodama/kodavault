'use server';

import { getRadarData, RadarCoin } from './radar';

export async function fetchRadarDataAction(): Promise<RadarCoin[]> {
  return getRadarData();
}
