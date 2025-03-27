"use client";

import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface RoomStoryProps {
  name: string;
  story: string;
  mainColors: string[];
}

export default function RoomStory({ name, story, mainColors }: RoomStoryProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start gap-2 mb-3">
          <Quote className="h-6 w-6 text-[#5a8d69] mt-1" />
          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-1">{name}</h3>
            <p className="text-muted-foreground">{story}</p>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Màu sắc chủ đạo:</p>
          <div className="flex flex-wrap gap-2">
            {mainColors.map((color, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs"
              >
                {color}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
