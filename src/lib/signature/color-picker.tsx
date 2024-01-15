import { ColorPickerRadio } from "@/components/ui/color-picker-radio";

export const DEFAULT_COLOR = "black";

interface ColorPickerProps {
  colors?: string[];
  selectedColor?: string;
  onSelectColor: (color: string) => void;
}

const ColorPicker = ({
  colors,
  selectedColor,
  onSelectColor,
}: ColorPickerProps) => (
  <div className="flex items-center justify-end gap-4 mb-4 px-2 w-full">
    {(colors ?? [DEFAULT_COLOR]).map(color => (
      <ColorPickerRadio
        key={color}
        isSelected={color === selectedColor}
        color={color}
        onPickColor={color => onSelectColor(color)}
      />
    ))}
  </div>
);

export { ColorPicker };
