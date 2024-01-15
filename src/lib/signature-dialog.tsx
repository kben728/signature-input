import { ReactNode, useEffect, useRef, useState } from "react";

import { SignatureDrawPad } from "@/lib/signature/draw";
import { SignatureTypePad } from "@/lib/signature/type";
import { SignatureDataRef } from "@/lib/signature/types";
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
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

interface Props {
  colors?: string[];
  children: ReactNode;
  setImage: (image: string) => void;
}

const SignatureDialog = ({ colors, children, setImage }: Props) => {
  const ref = useRef<SignatureDataRef>(null);
  const [isColorUniform, setIsColorUniform] = useState(false);
  const [selectedTab, setSelectedTab] = useState<"draw" | "type">("draw");
  const [submitValid, setSubmitValid] = useState(false);

  const handleExport = async () => {
    const data = (await ref.current?.getData()) ?? null;
    if (data) {
      setImage(data);
    }
    setSubmitValid(false);
  };

  useEffect(() => {
    setSubmitValid(false);
  }, [selectedTab]);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-full lg:max-w-6xl bg-dialogAccent p-0 gap-0 h-full sm:max-h-[690px] overflow-auto">
        <DialogHeader className="py-8 px-6">
          <DialogTitle>Add Signature</DialogTitle>
        </DialogHeader>
        <Separator />
        <div className="flex justify-between px-6 pt-2">
          <div className="flex items-center space-x-8 relative px-4">
            <button
              className={`px-4 pb-4 pt-2 focus:outline-none box-content text-md ${
                selectedTab === "draw"
                  ? "border-b-2 border-dialogAccent text-brand"
                  : "border-b-2 border-transparent"
              }`}
              onClick={() => setSelectedTab("draw")}>
              Draw
            </button>
            <button
              className={`px-4 pb-4 pt-2 focus:outline-none box-content text-md ${
                selectedTab === "type"
                  ? "border-b-2 border-dialogAccent text-brand"
                  : "border-b-2 border-transparent"
              }`}
              onClick={() => setSelectedTab("type")}>
              Type
            </button>
            <div
              data-testid="bottom-line"
              className={`absolute bottom-0 left-[-20px] h-0.5 w-20 bg-brand transition-transform ${
                selectedTab === "type"
                  ? "transform translate-x-24"
                  : "transform translate-x-0"
              }`}
            />
          </div>
          {selectedTab === "draw" && (
            <div className="flex items-center space-x-2">
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
          )}
        </div>
        <Separator />
        <div className="flex flex-col">
          {selectedTab === "draw" ? (
            <SignatureDrawPad
              ref={ref}
              colors={colors}
              uniformColor={isColorUniform}
              setValid={value => setSubmitValid(value)}
            />
          ) : (
            <SignatureTypePad
              colors={colors}
              ref={ref}
              setValid={value => setSubmitValid(value)}
            />
          )}
        </div>
        <Separator />
        <DialogFooter className="sm:justify-end gap-2 p-6">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="rounded-sm border border-gray-300">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              disabled={!submitValid}
              className="text-white rounded-sm bg-brand hover:bg-brand"
              onClick={handleExport}>
              Done
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { SignatureDialog };
