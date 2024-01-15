import { useState } from "react";

import { Button } from "@/components/ui/button";
import { SignatureDialog } from "@/lib/signature-dialog";

const colors = ["black", "#2293FB", "#4536E3"];

function Demo() {
  const [base64Image, setBase64Image] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col gap-4 justify-center items-center">
      {base64Image && (
        <div className="p-4 mb-10 flex flex-col items-center max-h-[500px] max-w-[500px] gap-2">
          <img alt="signature" src={base64Image} />
          <Button
            variant="destructive"
            className="max-w-20"
            onClick={() => setBase64Image(null)}>
            Clear
          </Button>
        </div>
      )}

      <SignatureDialog colors={colors} setImage={setBase64Image}>
        <div className="p-4 border border-slate-600 bg-slate-300 rounded-lg flex flex-col items-center gap-4">
          <Button
            variant="default"
            className="text-white font-bold"
            size="lg">
            CREATE A SIGNATURE
          </Button>
        </div>
      </SignatureDialog>
    </div>
  );
}

export default App;
