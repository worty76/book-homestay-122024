import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function SleepingArrangements() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Where you'll sleep</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4">
          <Card>
            <CardContent className="p-4">
              <Image
                src="/images/bedroom.jpg"
                alt="Bedroom"
                width={200}
                height={150}
                className="mb-2 rounded"
              />
              <h4 className="font-semibold">Bedroom</h4>
              <p className="text-sm text-gray-500">1 queen bed</p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
