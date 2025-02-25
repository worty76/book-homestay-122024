import { PocketIcon as Pool, Utensils } from "lucide-react";

export default function BookingSummary() {
  return (
    <div className="w-full max-w-2xl bg-white rounded-lg border p-6">
      <h2 className="text-2xl font-semibold mb-6">Thông Tin Đặt Phòng</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <h3 className="text-sm text-gray-600">Nhận Phòng</h3>
          <p className="font-medium">Saturday, 22/02/2025</p>
          <p className="text-sm">Thời Gian Nhận Phòng</p>
          <p className="font-medium">14:00</p>
        </div>
        <div className="text-right">
          <h3 className="text-sm text-gray-600">Trả Phòng</h3>
          <p className="font-medium">Sunday, 23/02/2025</p>
          <p className="text-sm">Thời Gian Trả Phòng</p>
          <p className="font-medium">12:00</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <h3 className="text-xl font-semibold">Thông Tin Phòng</h3>
        <div>
          <p className="font-medium">Phòng: Flora Villa</p>
          <p className="text-gray-600">Giá Phòng: 7.000.000₫</p>
          <p className="text-gray-600">
            Giá Phòng Cuối Tuần (Thứ 6, Thứ 7): 9.000.000₫
          </p>
        </div>

        <div className="space-y-2">
          <p className="flex items-center gap-2">
            <span className="inline-block">🏠</span> 1000m²
          </p>
          <p className="flex items-center gap-2">
            <span className="inline-block">🛏️</span> 11 Giường
          </p>
          <p>Sức Chứa: 22 Người + 8 Trẻ Em</p>
          <p className="flex items-center gap-2">
            <Pool className="h-4 w-4" /> Hồ Bơi
          </p>
          <p className="flex items-center gap-2">
            <Utensils className="h-4 w-4" /> BBQ
          </p>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Tổng Giá</h3>
          <p className="text-xl font-bold">9.000.000₫</p>
        </div>
      </div>
    </div>
  );
}
