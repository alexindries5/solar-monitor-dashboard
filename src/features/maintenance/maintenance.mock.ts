import type { GridRowsProp } from '@mui/x-data-grid';
import type { TimelineItem } from '../../components/ui/Timeline';

export const maintenanceTimeline: TimelineItem[] = [
  {
    id: 'mt1',
    title: 'Inverter string check',
    description: 'Technician team scheduled to balance string 14 and 15 voltages.',
    date: 'Tomorrow, 09:00',
    status: 'scheduled',
  },
  {
    id: 'mt2',
    title: 'Tracker inspection',
    description: 'Greasing and torque check for rows 3-8 completed.',
    date: 'Today, 13:20',
    status: 'completed',
  },
  {
    id: 'mt3',
    title: 'IV-curve scan',
    description: 'Baseline measurement for Park North array before summer.',
    date: 'Fri, 10:30',
    status: 'in-progress',
  },
  {
    id: 'mt4',
    title: 'Weather station calibration',
    description: 'Pyranometer cleaning and sensor calibration overdue.',
    date: 'Overdue by 2 days',
    status: 'blocked',
  },
];

export const workOrders: GridRowsProp = [
  {
    id: 1,
    site: 'Desert Bloom',
    priority: 'High',
    assignee: 'Jordan Kim',
    dueDate: '2024-07-11',
    status: 'Open',
  },
  {
    id: 2,
    site: 'Canyon Ridge',
    priority: 'Medium',
    assignee: 'Priya Sen',
    dueDate: '2024-07-12',
    status: 'In Progress',
  },
  {
    id: 3,
    site: 'Aurora Plains',
    priority: 'Low',
    assignee: 'Xia Li',
    dueDate: '2024-07-15',
    status: 'Scheduled',
  },
  {
    id: 4,
    site: 'Harbor Field',
    priority: 'High',
    assignee: 'Dev Patel',
    dueDate: '2024-07-09',
    status: 'Open',
  },
];

export const spareStock = [
  { label: 'Inverter fans', quantity: 38, status: 'Healthy' },
  { label: 'DC fuses', quantity: 20, status: 'Reorder recommended' },
  { label: 'Connectors', quantity: 140, status: 'Healthy' },
  { label: 'Weather sensors', quantity: 4, status: 'Critical' },
];
