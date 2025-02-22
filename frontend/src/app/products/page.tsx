import { Header } from "@/components/main/Header";
import VillaListing from "@/components/main/products/VillaListing";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Page() {
  return (
    <>
      <Header />
      <div className="container mx-auto my-20">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-96 flex-shrink-0 hidden md:block">
            <div className="sticky ps-6 top-4 space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Danh Mục</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="phone" />
                    <label htmlFor="phone" className="text-sm">
                      Điện Thoại & Phụ Kiện
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="cases" />
                    <label htmlFor="cases" className="text-sm">
                      Ốp lưng, bao da
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="chargers" />
                    <label htmlFor="chargers" className="text-sm">
                      Sạc & Cáp
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Nơi Bán</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="hcm" />
                    <label htmlFor="hcm" className="text-sm">
                      TP. Hồ Chí Minh
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="hanoi" />
                    <label htmlFor="hanoi" className="text-sm">
                      Hà Nội
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Nơi Bán</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="hcm" />
                    <label htmlFor="hcm" className="text-sm">
                      TP. Hồ Chí Minh
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="hanoi" />
                    <label htmlFor="hanoi" className="text-sm">
                      Hà Nội
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Nơi Bán</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="hcm" />
                    <label htmlFor="hcm" className="text-sm">
                      TP. Hồ Chí Minh
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="hanoi" />
                    <label htmlFor="hanoi" className="text-sm">
                      Hà Nội
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Nơi Bán</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="hcm" />
                    <label htmlFor="hcm" className="text-sm">
                      TP. Hồ Chí Minh
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="hanoi" />
                    <label htmlFor="hanoi" className="text-sm">
                      Hà Nội
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Nơi Bán</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="hcm" />
                    <label htmlFor="hcm" className="text-sm">
                      TP. Hồ Chí Minh
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="hanoi" />
                    <label htmlFor="hanoi" className="text-sm">
                      Hà Nội
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Nơi Bán</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="hcm" />
                    <label htmlFor="hcm" className="text-sm">
                      TP. Hồ Chí Minh
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="hanoi" />
                    <label htmlFor="hanoi" className="text-sm">
                      Hà Nội
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Nơi Bán</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="hcm" />
                    <label htmlFor="hcm" className="text-sm">
                      TP. Hồ Chí Minh
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="hanoi" />
                    <label htmlFor="hanoi" className="text-sm">
                      Hà Nội
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Nơi Bán</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="hcm" />
                    <label htmlFor="hcm" className="text-sm">
                      TP. Hồ Chí Minh
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="hanoi" />
                    <label htmlFor="hanoi" className="text-sm">
                      Hà Nội
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 pe-4">
            {/* Sort Bar */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Sắp xếp theo
                </span>
                <Button
                  variant="secondary"
                  className="bg-red-500 text-white hover:bg-red-600"
                >
                  Phổ Biến
                </Button>
                <Button variant="outline">Mới Nhất</Button>
                <Button variant="outline">Bán Chạy</Button>
              </div>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Giá" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low-to-high">Giá: Thấp đến Cao</SelectItem>
                  <SelectItem value="high-to-low">Giá: Cao đến Thấp</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <VillaListing />
              <VillaListing />
              <VillaListing />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
