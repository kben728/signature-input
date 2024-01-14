import { useRef, useState } from "react";

import { SignatureDrawPad } from "@/components/signature/draw";
import { SignatureTypePad } from "@/components/signature/type";
import { SignatureDataRef } from "@/components/signature/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const colors = ["black", "#2293FB", "#4536E3"];

function App() {
  const ref = useRef<SignatureDataRef>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [isColorUniform, setIsColorUniform] = useState(false);

  const handleExport = async () => {
    const data = (await ref.current?.getData()) ?? null;
    setBase64Image(data);
  };

  return (
    <div className="min-h-screen flex flex-col gap-4 justify-center items-center bg-primary-background">
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

      <div className="p-4 border border-slate-600 bg-slate-300 rounded-lg flex flex-col items-center gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="default"
              className="text-white font-bold"
              size="lg">
              CREATE A SIGNATURE
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-full lg:max-w-4xl bg-white">
            <DialogHeader>
              <DialogTitle>Add Signature</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="draw">
              <TabsList>
                <TabsTrigger className="font-bold" value="draw">
                  Draw
                </TabsTrigger>
                <TabsTrigger className="font-bold" value="type">
                  Type
                </TabsTrigger>
              </TabsList>
              <TabsContent value="draw">
                <div className="flex flex-col">
                  <div className="flex items-center space-x-2 ">
                    <Switch
                      id="color-uniformity"
                      checked={isColorUniform}
                      onCheckedChange={value =>
                        setIsColorUniform(Boolean(value))
                      }
                    />
                    <Label
                      htmlFor="color-uniformity"
                      className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Uniform color
                    </Label>
                  </div>
                  <SignatureDrawPad
                    ref={ref}
                    colors={colors}
                    uniformColor={isColorUniform}
                  />
                </div>
              </TabsContent>
              <TabsContent value="type">
                <SignatureTypePad ref={ref} colors={colors} />
              </TabsContent>
            </Tabs>
            <DialogFooter className="sm:justify-end gap-2">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  className="rounded-sm">
                  Cancel
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  type="button"
                  className="text-white rounded-sm bg-brand"
                  onClick={handleExport}>
                  Done
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default App;
