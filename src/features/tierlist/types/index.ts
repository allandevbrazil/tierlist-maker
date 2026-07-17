export interface TierItem {
  id: string;
  imageUrl: string;
  name?: string;
}

export interface Tier {
  id: string;
  label: string;
  color: string;
  items: TierItem[];
}

export interface TierlistData {
  title: string;
  subtitle: string;
  tiers: Tier[];
  unassignedItems: TierItem[];
}
