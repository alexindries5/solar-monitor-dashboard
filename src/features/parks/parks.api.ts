import { parks } from './parks.mock';
import type { Park } from './parks.types';

export const fetchParks = async (): Promise<Park[]> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return parks;
};

export const fetchPark = async (id: string): Promise<Park | undefined> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return parks.find((park) => park.id === id);
};
