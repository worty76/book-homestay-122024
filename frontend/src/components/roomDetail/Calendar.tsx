import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

export default function Calendar() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>7 nights in New York</CardTitle>
        <p className="text-sm text-gray-500">Feb 19, 2022 - Feb 26, 2022</p>
      </CardHeader>
      <CardContent>
        <CalendarComponent mode="range" />
      </CardContent>
    </Card>
  );
}
