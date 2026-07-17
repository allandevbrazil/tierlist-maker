import { useDroppable } from "@dnd-kit/core";
import type { Tier } from "../types";
import DraggableImage from "./DraggableImage";

interface TierRowProps {
  tier: Tier;
}

export default function TierRow({ tier }: TierRowProps) {
  const { setNodeRef } = useDroppable({
    id: tier.id,
  });

  return (
    <div className="flex border-b border-black min-h-[100px] bg-zinc-800">
      <div
        className="w-24 md:w-32 flex items-center justify-center font-bold text-2xl text-black"
        style={{ backgroundColor: tier.color }}
      >
        {tier.label}
      </div>
      <div
        ref={setNodeRef}
        className="flex-1 flex flex-wrap items-center gap-2 p-3"
      >
        {tier.items.map((item) => (
          <DraggableImage key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
