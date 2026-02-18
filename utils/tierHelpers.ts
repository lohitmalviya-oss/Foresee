
import { TIERS } from './constants';

export const getTierInfo = (rep: number) => {
  for (let i = TIERS.length - 1; i >= 0; i--) {
    if (rep >= TIERS[i].min) return { ...TIERS[i], next: TIERS[i + 1] || null };
  }
  return { ...TIERS[0], next: TIERS[1] };
};
