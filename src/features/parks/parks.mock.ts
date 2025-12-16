import type { Park } from './parks.types';
import { dayjs } from '../../lib/dayjs';

export const parks: Park[] = [
  {
    id: 'park-1',
    name: 'Sunrise Valley',
    location: 'Nevada, USA',
    capacity: 12000,
    status: 'Online',
    currentPower: 4850,
    todayEnergy: 18500,
    performanceRatio: 0.84,
    lastUpdated: dayjs().subtract(5, 'minute').toISOString(),
  },
  {
    id: 'park-2',
    name: 'Desert Bloom',
    location: 'Arizona, USA',
    capacity: 9500,
    status: 'Degraded',
    currentPower: 3200,
    todayEnergy: 14200,
    performanceRatio: 0.76,
    lastUpdated: dayjs().subtract(14, 'minute').toISOString(),
  },
  {
    id: 'park-3',
    name: 'Coastal Rays',
    location: 'California, USA',
    capacity: 15000,
    status: 'Online',
    currentPower: 5120,
    todayEnergy: 19250,
    performanceRatio: 0.88,
    lastUpdated: dayjs().subtract(2, 'minute').toISOString(),
  },
  {
    id: 'park-4',
    name: 'Highland Solar',
    location: 'Colorado, USA',
    capacity: 8000,
    status: 'Offline',
    currentPower: 0,
    todayEnergy: 9200,
    performanceRatio: 0.0,
    lastUpdated: dayjs().subtract(1, 'hour').toISOString(),
  },
];
