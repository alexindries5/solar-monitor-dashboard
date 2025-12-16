import { MonetizationOn, ShowChart, TrendingUp } from '@mui/icons-material';
import type { GridRowsProp } from '@mui/x-data-grid';

export const reportStats = [
  { label: 'Monthly Yield', value: '412 MWh', delta: '+4.2%', icon: <TrendingUp /> },
  { label: 'Revenue', value: '$126k', delta: '+6.4%', icon: <MonetizationOn /> },
  { label: 'Availability', value: '98.7%', delta: '+0.3%', icon: <ShowChart /> },
];

export const monthlyProduction = [
  { month: 'Jan', energy: 360, revenue: 92 },
  { month: 'Feb', energy: 372, revenue: 95 },
  { month: 'Mar', energy: 401, revenue: 110 },
  { month: 'Apr', energy: 410, revenue: 118 },
  { month: 'May', energy: 425, revenue: 125 },
  { month: 'Jun', energy: 432, revenue: 128 },
];

export const reportsTableRows: GridRowsProp = [
  { id: 1, period: 'Q2 2024', energyMwh: 1235, uptime: 98.2, pr: 82.4, revenue: 360000, alarms: 12 },
  { id: 2, period: 'Q1 2024', energyMwh: 1162, uptime: 97.8, pr: 80.9, revenue: 334000, alarms: 18 },
  { id: 3, period: 'Q4 2023', energyMwh: 1095, uptime: 97.4, pr: 79.6, revenue: 318000, alarms: 21 },
  { id: 4, period: 'Q3 2023', energyMwh: 1021, uptime: 96.8, pr: 78.9, revenue: 302000, alarms: 25 },
];
