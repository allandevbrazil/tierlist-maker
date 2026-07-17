import { useEffect } from "react";
import { DndContext, closestCorners } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import { useTierlistStore } from "../../../store/useTierlistStore";
import type { TierlistData } from "../types";
import TierRow from "./TierRow";
import ImageBank from "./ImageBank";

interface TierlistBoardProps {
  initialData: TierlistData;
  onBack: () => void;
}

export default function TierlistBoard({
  initialData,
  onBack,
}: TierlistBoardProps) {
  const { data, setData, moveItem } = useTierlistStore();

  useEffect(() => {
    setData(initialData);
  }, [initialData, setData]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    moveItem(activeId, overId);
  };

  const handleReset = () => {
    setData({
      ...initialData,
      tiers: initialData.tiers.map((tier) => ({ ...tier, items: [] })),
      unassignedItems: [...initialData.unassignedItems],
    });
  };

  if (!data) return null;

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="flex flex-col items-center w-full max-w-5xl mx-auto gap-8">
        <header className="text-center">
          <h1 className="text-4xl font-black uppercase mb-2 tracking-wide">
            {data.title}
          </h1>
          {data.subtitle && (
            <p className="text-zinc-400 font-medium">{data.subtitle}</p>
          )}
        </header>

        <div className="w-full flex flex-col border-2 border-black bg-black rounded shadow-2xl overflow-hidden">
          {data.tiers.map((tier) => (
            <TierRow key={tier.id} tier={tier} />
          ))}
        </div>

        <ImageBank items={data.unassignedItems} />

        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="rounded bg-zinc-800 px-4 py-2 font-semibold text-white transition hover:bg-zinc-700"
          >
            RESET
          </button>
          <button
            type="button"
            onClick={onBack}
            className="rounded bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-500"
          >
            VOLTAR
          </button>
        </div>
      </div>
    </DndContext>
  );
}
