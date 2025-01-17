"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, Heart, MapPin, Search, Users, Wifi, X } from "lucide-react";
import Image from "next/image";
import SearchForm from "@/components/SearchForm";

export default function HotelSearch() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Search Bar */}
      <SearchForm />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4 grid gap-6 md:grid-cols-[300px,1fr]">
        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">Giá mỗi đêm</h3>
              <div className="space-y-4">
                <Slider
                  defaultValue={[167050, 1099190]}
                  max={1500000}
                  step={1000}
                />
                <div className="flex justify-between text-sm">
                  <span>₫167,050</span>
                  <span>₫1,099,190</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-2">
            <h3 className="font-semibold">Bộ lọc phổ biến cho Hồ Chí Minh</h3>
            <div className="space-y-2">
              {[
                "Máy pha trà/cà phê",
                "Sưởi",
                "Bồn tắm",
                "Bếp",
                "Truy cập Internet",
              ].map((filter) => (
                <label key={filter} className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span>{filter}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-4">
          {/* Sort Options */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Select defaultValue="relevant">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sắp xếp theo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevant">Phù hợp nhất</SelectItem>
                <SelectItem value="rating">Được đánh giá nhiều nhất</SelectItem>
                <SelectItem value="price-low">Giá thấp nhất trước</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Hotel Card */}
          <Card className="overflow-hidden">
            <div className="grid md:grid-cols-[300px,1fr] gap-4">
              <div className="relative h-[200px] md:h-full">
                <Image
                  src="/images/image4.png"
                  alt="Hotel room"
                  fill
                  className="object-cover"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold">YÊN HOUSE (YEN HOUSE)</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary">Toàn bộ căn hộ</Badge>
                      <div className="flex gap-1">
                        <span className="w-2 h-2 rounded-full bg-red-500" />
                        <span className="w-2 h-2 rounded-full bg-yellow-500" />
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-2">
                      <MapPin className="h-4 w-4" />
                      Tân Bình, Hồ Chí Minh - cách trung tâm 3,6 km
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">8,4</span>
                      <span className="text-sm text-blue-600">Tuyệt vời</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      58 Nhận xét
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Wifi className="h-4 w-4" />
                    WiFi miễn phí
                  </Badge>
                </div>
                <div className="mt-4 flex justify-between items-end">
                  <div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>x 1</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-red-500">
                      ₫324,074
                    </span>
                    <div className="text-sm text-muted-foreground">
                      + HUỶ MIỄN PHÍ
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
