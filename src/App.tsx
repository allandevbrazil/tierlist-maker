import { useState } from "react";
import SetupForm from "./features/tierlist/components/SetupForm.tsx";
import TierlistBoard from "./features/tierlist/components/TierlistBoard.tsx";
import type { TierlistData } from "./features/tierlist/types";
import { useTierlistStore } from "./store/useTierlistStore";

function App() {
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [tierlistData, setTierlistData] = useState<TierlistData | null>(null);
  const resetStore = useTierlistStore((state) => state.resetData);

  const handleSetupComplete = (data: TierlistData) => {
    setTierlistData(data);
    setIsSetupComplete(true);
  };

  const handleBackToSetup = () => {
    resetStore();
    setTierlistData(null);
    setIsSetupComplete(false);
  };

  return (
    <main className="min-h-screen container mx-auto py-8">
      {!isSetupComplete ? (
        <SetupForm onComplete={handleSetupComplete} />
      ) : (
        <TierlistBoard initialData={tierlistData!} onBack={handleBackToSetup} />
      )}
    </main>
  );
}

export default App;
