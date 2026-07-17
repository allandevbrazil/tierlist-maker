import { useDroppable } from "@dnd-kit/core";
import type { TierItem } from "../types";
import DraggableImage from "./DraggableImage";

interface ImageBankProps {
  items: TierItem[];
}

export default function ImageBank({ items }: ImageBankProps) {
  const { setNodeRef } = useDroppable({
    id: "unassigned",
  });

  return (
    <div
      ref={setNodeRef}
      className="w-full min-h-[150px] bg-zinc-900 p-6 rounded-lg flex flex-wrap gap-4 justify-center items-center border border-zinc-800 shadow-inner"
    >
      {items.map((item) => (
        <DraggableImage key={item.id} item={item} />
      ))}
    </div>
  );
}
