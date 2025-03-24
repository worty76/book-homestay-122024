"use client";

import { BedDouble, CalendarDays, Users, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguageStore } from "@/store/useLanguageStore";

export default function Dashboard() {
  const { translations } = useLanguageStore();

  const t = (key: string): string => {
    return (
      key.split(".").reduce((o, i) => {
        if (typeof o === "object" && o !== null) {
          return o[i];
        }
        return key;
      }, translations as any) || key
    );
  };

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">
          {t("dashboard.title")}
        </h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
            <BedDouble className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
