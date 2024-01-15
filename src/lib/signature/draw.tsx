import {
  Ref,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import SignaturePad from "react-signature-pad-wrapper";

import { Button } from "@/components/ui/button";
import { ColorPicker, DEFAULT_COLOR } from "./color-picker";
import { SignatureDataRef, SignaturePadProps } from "./types";


const SignatureDrawPad = forwardRef(
  (
    {
      colors,
      initialColor,
      outputFormat,
      uniformColor,
      setValid,
    }: SignaturePadProps,
    ref: Ref<SignatureDataRef>
  ) => {
    const padRef = useRef<SignaturePad | null>(null);

    const [isDirty, setIsDirty] = useState(false);
    const [selectedColor, setSelectedColor] = useState(
      initialColor ?? (colors ? colors[0] : DEFAULT_COLOR)
    );

    useEffect(() => {
      if (padRef.current, setValid) {
        padRef.current?.instance.addEventListener(
          "endStroke",
          () => {
            setIsDirty(true);
            setValid(true);
          },
          false
        );
      }
    }, [padRef]);

    useEffect(() => {
      if (padRef.current) {
        padRef.current.penColor = selectedColor;
      }
      const updatedData =
        padRef.current?.toData().map(entry => ({
          ...entry,
          penColor: selectedColor,
        })) ?? [];

      if (uniformColor) {
        // update the existing lines' colors as they will retain the old one by default
        padRef.current?.fromData(updatedData);
      }
    }, [selectedColor, uniformColor, padRef]);

    useImperativeHandle(ref, () => ({
      getData: () =>
        new Promise(resolve =>
          resolve(padRef.current?.toDataURL(outputFormat) ?? "")
        ),
    }));

    const handleClear = () => {
      padRef.current?.clear();
      setIsDirty(false);
      setValid?.(false);
    };

    return (
      <div className="flex flex-col items-center gap-2 w-full bg-white py-4">
        <div className="w-1/2 mt-6 mb-2">
          <ColorPicker
            colors={colors}
            selectedColor={selectedColor}
            onSelectColor={color => setSelectedColor(color)}
          />
        </div>
        <div className="flex bg-canvas border-dashed border-gray-300 border rounded-md w-full sm:w-3/4 lg:w-1/2 h-full">
          <div className="w-full h-full" data-testid="signature-pad">
            <SignaturePad
              ref={padRef}
              options={{
                penColor: selectedColor,
              }}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="lg"
            variant="ghost"
            className={`text-md ${isDirty ? "text-brand" : "text-gray-500"}`}
            onClick={() => handleClear()}>
            {isDirty ? "Clear Signature" : "Sign Here"}
          </Button>
        </div>
      </div>
    );
  }
);

export { SignatureDrawPad };
