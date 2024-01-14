import * as React from "react";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

interface ColorPickerProps extends React.HTMLAttributes<HTMLDivElement> {
  isSelected?: boolean;
  color: string;
  onPickColor: (color: string) => void;
}

const ColorPickerRadio = forwardRef<HTMLDivElement, ColorPickerProps>(
  ({ className, isSelected, color, onPickColor }, ref) => (
    <div
      ref={ref}
      onClick={() => onPickColor(color)}
      style={{
        backgroundColor: color, // this way we avoid forcing tailwind only colors
      }}
      className={cn(
        `flex items-center justify-center w-6 h-6 rounded-full cursor-pointer
          border-2 border-white transition-all ease-out duration-75
          ${isSelected ? "outline outline-4 outline-primary" : "hover:outline-gray-400 hover:outline hover:outline-4"}`,
        className
      )}
    />
  )
);

export { ColorPickerRadio };
