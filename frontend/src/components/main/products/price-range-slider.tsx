"use client";

import * as React from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface PriceRangeSliderProps {
  min: number;
  max: number;
  step?: number;
  onRangeChange?: (values: [number, number]) => void;
}

export function PriceRangeSlider({
  min,
  max,
  step = 100000,
  onRangeChange,
}: PriceRangeSliderProps) {
  const [range, setRange] = React.useState<[number, number]>([min, max]);

  const handleRangeChange = (values: number[]) => {
    const newRange: [number, number] = [values[0], values[1]];
    setRange(newRange);
    onRangeChange?.(newRange);
  };

  const handleInputChange = (index: 0 | 1, value: string) => {
    const numValue = Number(value.replace(/[^0-9]/g, ""));
    if (isNaN(numValue)) return;

    let newRange: [number, number];
    if (index === 0) {
      newRange = [Math.min(numValue, range[1]), range[1]];
    } else {
      newRange = [range[0], Math.max(numValue, range[0])];
    }

    setRange(newRange);
    onRangeChange?.(newRange);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-4">
      <Slider
        value={range}
        min={min}
        max={max}
        step={step}
        onValueChange={handleRangeChange}
        className="my-6"
      />
      <div className="flex items-center justify-between gap-4">
        <div className="grid gap-1.5 w-full">
          <Label htmlFor="min-price">Tối thiểu</Label>
          <Input
            id="min-price"
            type="text"
            value={formatCurrency(range[0])}
            onChange={(e) => handleInputChange(0, e.target.value)}
          />
        </div>
        <div className="grid gap-1.5 w-full">
          <Label htmlFor="max-price">Tối đa</Label>
          <Input
            id="max-price"
            type="text"
            value={formatCurrency(range[1])}
            onChange={(e) => handleInputChange(1, e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
