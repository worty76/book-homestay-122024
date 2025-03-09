"use client";

import AnotherHero from "@/components/main/AnotherHero";
import { Header } from "@/components/main/Header";
import { PriceRangeSlider } from "@/components/main/products/price-range-slider";
import VillaListing from "@/components/main/products/VillaListing";
import SearchBar from "@/components/main/SearchBar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Page() {
  return (
    <>
      <AnotherHero title="" description="" />

      <div className="container mx-auto my-10 px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="hidden xl:block w-full xl:w-72 flex-shrink-0">
            <Sidebar />
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Sort Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="w-full sm:w-auto">
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="secondary"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 flex-grow sm:flex-grow-0"
                  >
                    Phổ Biến
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-grow sm:flex-grow-0"
                  >
                    Mới Nhất
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-grow sm:flex-grow-0"
                  >
                    Bán Chạy
                  </Button>
                </div>
              </div>
              <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Giá" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low-to-high">Giá: Thấp đến Cao</SelectItem>
                  <SelectItem value="high-to-low">Giá: Cao đến Thấp</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Product Grid */}
            <div className="flex flex-col gap-6">
              <VillaListing />
              <VillaListing />
              <VillaListing />
            </div>

            <div className="mt-8 sm:mt-12 mb-8">
              <Pagination>
                <PaginationContent className="flex-wrap justify-center gap-2">
                  <PaginationItem className="hidden sm:inline-flex">
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem className="inline-flex sm:hidden">
                    <PaginationLink
                      aria-label="Go to previous page"
                      size="icon"
                      href="#"
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeft className="h-4 w-4" />
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem className="hidden sm:inline-flex">
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem className="hidden sm:inline-flex">
                    <PaginationLink href="#">10</PaginationLink>
                  </PaginationItem>
                  <PaginationItem className="hidden sm:inline-flex">
                    <PaginationNext href="#" />
                  </PaginationItem>
                  <PaginationItem className="inline-flex sm:hidden">
                    <PaginationLink
                      aria-label="Go to next page"
                      size="icon"
                      href="#"
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRight className="h-4 w-4" />
                    </PaginationLink>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

function Sidebar() {
  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Chủ đề</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="nui" />
            <Label htmlFor="nui">Núi</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="bien" />
            <Label htmlFor="bien">Biển</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="langtruyenthong" />
            <Label htmlFor="langtruyenthong">Làng truyền thống</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="countryside" />
            <Label htmlFor="countryside">Làng quê</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="bridge" />
            <Label htmlFor="bridge">Kiến trúc cầu Đà Nẵng hiện đại</Label>
          </div>
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Giá mỗi đêm</h3>
        <PriceRangeSlider
          min={0}
          max={133878520}
          step={100000}
          onRangeChange={(range) => console.log(range)}
        />
        <Button className="w-full mt-4">Áp dụng</Button>
      </div>
    </div>
  );
}
