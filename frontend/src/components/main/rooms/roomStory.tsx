"use client";

import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface RoomStoryProps {
  name: string;
  story: string;
  concept: string;
  mainColors: string[];
}

export default function RoomStory({ name, story, concept }: RoomStoryProps) {
  return (
    <Card className="mb-8 border-none bg-muted/50">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <div className="bg-primary/10 p-3 rounded-full text-primary">
            <Quote className="h-6 w-6" />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Câu chuyện về {name}</h2>
            <p className="text-muted-foreground leading-relaxed">{story}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
