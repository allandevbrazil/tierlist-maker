import { create } from "zustand";
import type { TierlistData, TierItem } from "../features/tierlist/types";

interface TierlistStore {
  data: TierlistData | null;
  setData: (data: TierlistData) => void;
  moveItem: (itemId: string, toTierId: string) => void;
  resetData: () => void;
}

export const useTierlistStore = create<TierlistStore>((set) => ({
  data: null,
  setData: (data) => set({ data }),
  resetData: () => set({ data: null }),
  moveItem: (itemId, toTierId) =>
    set((state) => {
      if (!state.data) return state;

      let itemToMove: TierItem | undefined;
      const newTiers = state.data.tiers.map((tier) => {
        const itemIndex = tier.items.findIndex((i) => i.id === itemId);
        if (itemIndex > -1) {
          itemToMove = tier.items[itemIndex];
          return { ...tier, items: tier.items.filter((i) => i.id !== itemId) };
        }
        return tier;
      });

      let newUnassigned = [...state.data.unassignedItems];
      if (!itemToMove) {
        const itemIndex = newUnassigned.findIndex((i) => i.id === itemId);
        if (itemIndex > -1) {
          itemToMove = newUnassigned[itemIndex];
          newUnassigned.splice(itemIndex, 1);
        }
      }

      if (!itemToMove) return state;

      if (toTierId === "unassigned") {
        newUnassigned.push(itemToMove);
      } else {
        const tierIndex = newTiers.findIndex((t) => t.id === toTierId);
        if (tierIndex > -1) {
          newTiers[tierIndex].items.push(itemToMove);
        }
      }

      return {
        data: {
          ...state.data,
          tiers: newTiers,
          unassignedItems: newUnassigned,
        },
      };
    }),
}));
