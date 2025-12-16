export type ParkStatus = 'Online' | 'Degraded' | 'Offline';

export type Park = {
  id: string;
  name: string;
  location: string;
  capacity: number;
  status: ParkStatus;
  currentPower: number;
  todayEnergy: number;
  performanceRatio: number;
  lastUpdated: string;
};
