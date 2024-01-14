import html2canvas from "html2canvas";
import {
  Ref,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { ColorPicker, DEFAULT_COLOR } from "./color-picker";
import { SignatureDataRef } from "./types";

interface SignatureTypePadProps {
  colors?: string[];
  initialColor?: string;
}

const INITIAL_VALUE = "Signature";

const FONT_MAP: Record<string, string> = {
  "1": "caveat",
  "2": "pacifico",
  "3": "marckScript",
  "4": "meddon",
} as const;

const SignatureTypePad = forwardRef(
  (
    { colors, initialColor }: SignatureTypePadProps,
    ref: Ref<SignatureDataRef>
  ) => {
    const ref1 = useRef<HTMLLabelElement>(null);
    const ref2 = useRef<HTMLLabelElement>(null);
    const ref3 = useRef<HTMLLabelElement>(null);
    const ref4 = useRef<HTMLLabelElement>(null);
    const refs = [ref1, ref2, ref3, ref4] as const;

    const [selectedColor, setSelectedColor] = useState(
      initialColor ?? (colors ? colors[0] : DEFAULT_COLOR)
    );
    const [selectedFont, setSelectedFont] = useState<string>("1");
    const [signature, setSignature] = useState(INITIAL_VALUE);

    useEffect(() => {
      if (!signature) {
        setSignature(INITIAL_VALUE);
      }
    }, [signature]);

    useImperativeHandle(ref, () => ({
      getData: () => handleGenerateImage(),
    }));

    const handleClear = () => {
      setSignature(INITIAL_VALUE);
    };

    const handleGenerateImage = (): Promise<string> =>
      new Promise((resolve, reject) => {
        const labelNode = refs[Number(selectedFont) - 1].current!;
        return html2canvas(labelNode, {
          backgroundColor: null,
          height: labelNode.offsetHeight * 2, // because of some padding issues the resulting image gets cut in half
          width: labelNode.offsetWidth,
        })
          .then(canvas => resolve(canvas.toDataURL()))
          .catch(error => reject(error));
      });

    const isDirty = signature !== INITIAL_VALUE;

    return (
      <div className="flex flex-col items-center gap-2 w-full">
        <ColorPicker
          colors={colors}
          selectedColor={selectedColor}
          onSelectColor={color => setSelectedColor(color)}
        />
        <div className="flex flex-col items-center w-full h-full max-w-lg">
          <Input
            className={`outline-none rounded-none h-16 text-4xl font-${FONT_MAP[selectedFont]} text-center border-black border-t-0 border-l-0 border-r-0
          focus-visible:ring-transparent focus-visible:border-t-1 focus-visible:border focus-visible:border-l-1 focus-visible:border-r-1`}
            value={signature}
            onFocus={e => e.target.select()}
            style={{
              color: selectedColor,
            }}
            onChange={e => setSignature(e.target.value)}
          />
          <div className="flex items-center gap-2">
            <Button
              size="lg"
              variant="ghost"
              className={`text-lg ${isDirty ? "text-primary" : "text-gray-500"}`}
              onClick={() => handleClear()}>
              {isDirty ? "Clear Signature" : "Sign Here"}
            </Button>
          </div>
        </div>

        <RadioGroup
          value={selectedFont}
          onValueChange={e => setSelectedFont(e)}
          className="flex flex-col w-full sm:grid sm:grid-cols-2 gap-0">
          {Object.values(FONT_MAP).map((fontName, index) => {
            const offByOneFix = index + 1;
            return (
              <div
                key={fontName}
                onClick={() => setSelectedFont(offByOneFix.toString())}
                className="flex p-5 justify-start items-center gap-2 cursor-pointer h-28 hover:bg-white border border-gray-300 bg-slate-100">
                <RadioGroupItem
                  value={offByOneFix.toString()}
                  id={`${offByOneFix}-font`}
                />
                <Label
                  htmlFor={`${offByOneFix}-font`}
                  ref={refs[index]}
                  className={`text-3xl font-${fontName}`}
                  style={{
                    color: selectedColor,
                  }}>
                  {signature}
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      </div>
    );
  }
);

export { SignatureTypePad };
