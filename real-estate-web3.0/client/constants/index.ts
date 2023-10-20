import { CategoriesType } from '@/types';

export const bannerCategories: {
  name: Omit<CategoriesType, 'all'>;
  link: string;
  worth: number;
}[] = [
  { name: 'housing', link: '/housing', worth: 4264.2383 },
  { name: 'office', link: '/office', worth: 4264.2383 },
  { name: 'framhouse', link: '/framhouse', worth: 4264.2383 },
  { name: 'retail', link: '/retail', worth: 4264.2383 },
  { name: 'commercial', link: '/commercial', worth: 4264.2383 },
  { name: 'country', link: '/country', worth: 4264.2383 },
];

export const categories: {
  name: CategoriesType;
}[] = [
  { name: 'all' },
  { name: 'housing' },
  { name: 'office' },
  { name: 'framhouse' },
  { name: 'retail' },
  { name: 'commercial' },
  { name: 'country' },
];
