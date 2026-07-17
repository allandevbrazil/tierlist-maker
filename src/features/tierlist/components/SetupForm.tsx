import React, { useState } from "react";
import type { TierlistData, TierItem, Tier } from "../types";

interface SetupFormProps {
  onComplete: (data: TierlistData) => void;
}

export default function SetupForm({ onComplete }: SetupFormProps) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [uploadedImages, setUploadedImages] = useState<TierItem[]>([]);
  const [tiers, setTiers] = useState<Tier[]>([
    { id: crypto.randomUUID(), label: "S", color: "#ff7f7f", items: [] },
    { id: crypto.randomUUID(), label: "A", color: "#ffbf7f", items: [] },
    { id: crypto.randomUUID(), label: "B", color: "#ffff7f", items: [] },
    { id: crypto.randomUUID(), label: "C", color: "#7fff7f", items: [] },
    { id: crypto.randomUUID(), label: "D", color: "#7fbfff", items: [] },
  ]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    if (files.length + uploadedImages.length > 20) {
      alert("Você só pode fazer upload de até 20 imagens.");
      return;
    }

    const newImages = files.map((file) => ({
      id: crypto.randomUUID(),
      imageUrl: URL.createObjectURL(file),
    }));

    setUploadedImages((prev) => [...prev, ...newImages]);
  };

  const handleTierChange = (id: string, field: keyof Tier, value: string) => {
    setTiers(
      tiers.map((tier) =>
        tier.id === id ? { ...tier, [field]: value } : tier,
      ),
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({
      title,
      subtitle,
      tiers,
      unassignedItems: uploadedImages,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 max-w-2xl mx-auto bg-gray-900 p-8 rounded-lg shadow-xl"
    >
      <h2 className="text-2xl font-bold text-center text-white">
        Configurar Tierlist
      </h2>

      <input
        type="text"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título da Tierlist"
        className="p-3 bg-gray-800 text-white rounded border border-gray-700"
      />

      <input
        type="text"
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
        placeholder="Subtítulo (opcional)"
        className="p-3 bg-gray-800 text-white rounded border border-gray-700"
      />

      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold text-white">Configurar Tiers</h3>
        {tiers.map((tier) => (
          <div key={tier.id} className="flex gap-4">
            <input
              type="text"
              value={tier.label}
              onChange={(e) =>
                handleTierChange(tier.id, "label", e.target.value)
              }
              className="p-2 bg-gray-800 text-white rounded border border-gray-700 w-24 text-center"
            />
            <input
              type="color"
              value={tier.color}
              onChange={(e) =>
                handleTierChange(tier.id, "color", e.target.value)
              }
              className="h-10 w-16 bg-transparent cursor-pointer"
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-lg font-semibold text-white">
          Imagens ({uploadedImages.length}/20)
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          className="p-3 bg-gray-800 text-white rounded border border-gray-700 cursor-pointer"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 p-3 rounded text-white font-bold transition-colors"
      >
        Gerar Tierlist
      </button>
    </form>
  );
}
