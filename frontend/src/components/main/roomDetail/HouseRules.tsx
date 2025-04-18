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
import { useTranslation } from "@/hooks/useTranslation";

export default function HouseRules() {
  const { t } = useTranslation();

  const rules = [
    { icon: Clock, label: t("roomDetail.rules.checkIn") },
    { icon: CalendarClock, label: t("roomDetail.rules.checkOut") },
    { icon: Sparkles, label: t("roomDetail.rules.selfCheckIn") },
    { icon: Ruler, label: t("roomDetail.rules.noInfants") },
    { icon: Cigarette, label: t("roomDetail.rules.noSmoking") },
    { icon: PawPrint, label: t("roomDetail.rules.noPets") },
    { icon: Music, label: t("roomDetail.rules.noParties") },
  ];

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{t("roomDetail.rules.thingsToKnow")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold mb-4">
              {t("roomDetail.rules.houseRules")}
            </h3>
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
            <h3 className="font-semibold mb-4">
              {t("roomDetail.rules.healthSafety")}
            </h3>
            <p className="text-sm">{t("roomDetail.rules.cleaningProcess")}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">
              {t("roomDetail.rules.cancellationPolicy")}
            </h3>
            <p className="text-sm">{t("roomDetail.rules.freeCancellation")}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
