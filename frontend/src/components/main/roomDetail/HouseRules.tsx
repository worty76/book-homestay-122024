import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Clock,
  CalendarClock,
  Sparkles,
  Ruler,
  Cigarette,
  PawPrint,
  Music,
} from "lucide-react";

export default function HouseRules() {
  const rules = [
    { icon: Clock, label: "Check-in: After 4:00 PM" },
    { icon: CalendarClock, label: "Checkout: 10:00 AM" },
    { icon: Sparkles, label: "Self check-in with lockbox" },
    { icon: Ruler, label: "Not suitable for infants (under 2 years)" },
    { icon: Cigarette, label: "No smoking" },
    { icon: PawPrint, label: "No pets" },
    { icon: Music, label: "No parties or events" },
  ];

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Things to know</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold mb-4">House rules</h3>
            <ul className="space-y-2">
              {rules.map((rule, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <rule.icon className="h-5 w-5" />
                  <span className="text-sm">{rule.label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Health & safety</h3>
            <p className="text-sm">
              Committed to Airbnb's enhanced cleaning process. Show more
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Cancellation policy</h3>
            <p className="text-sm">Free cancellation before Feb 14</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
