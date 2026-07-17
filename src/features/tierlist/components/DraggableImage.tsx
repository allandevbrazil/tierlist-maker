import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { TierItem } from "../types";

interface DraggableImageProps {
  item: TierItem;
}

export default function DraggableImage({ item }: DraggableImageProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-transparent hover:border-white transition-colors cursor-grab active:cursor-grabbing"
    >
      <img
        src={item.imageUrl}
        alt={item.name || "Tier item"}
        className="w-full h-full object-cover"
        draggable={false}
      />
    </div>
  );
}
