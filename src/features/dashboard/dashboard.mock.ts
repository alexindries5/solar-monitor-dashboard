import { dayjs } from '../../lib/dayjs';

export const dashboardStats = [
  { label: 'Total Power', value: 4820, unit: 'kW', delta: '+4.2%' },
  { label: 'Today Energy', value: 18750, unit: 'kWh', delta: '+8.1%' },
  { label: 'Active Alerts', value: 12, unit: '', delta: '-2 vs yesterday' },
  { label: 'Avg PR', value: 83, unit: '%', delta: '+1.2%' },
];

export const powerToday = Array.from({ length: 12 }).map((_, idx) => ({
  time: `${6 + idx}:00`,
  power: Math.round(300 + Math.random() * 450),
}));

export const energyByDay = Array.from({ length: 7 }).map((_, idx) => ({
  day: dayjs().subtract(6 - idx, 'day').format('ddd'),
  energy: Math.round(15000 + Math.random() * 4000),
}));

export const recentAlerts = [
  { id: 'a1', message: 'Inverter 12 - DC overvoltage', severity: 'High', time: '5m ago' },
  { id: 'a2', message: 'String 4 - Low performance', severity: 'Medium', time: '18m ago' },
  { id: 'a3', message: 'Weather station offline', severity: 'Low', time: '1h ago' },
  { id: 'a4', message: 'Grid instability detected', severity: 'High', time: '2h ago' },
  { id: 'a5', message: 'Meter sync delayed', severity: 'Low', time: '3h ago' },
];
