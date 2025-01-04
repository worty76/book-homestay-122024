/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { Title } from "./title";

export function Pricing() {
  return (
    <>
      <section className="relative py-20 bg-black text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/Price.png"
            alt="Luxury Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-70"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="my-[80px]">
            <Title subtitle="Luxury" title="TIỆN ÍCH HOMESTAY" />
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <PricingCard days="Thứ 2 - Thứ 6" price="450.000đ" />
            <PricingCard days="Thứ 7 - Chủ nhật" price="550.000đ" />
          </div>
          <p className="text-center mt-6 mb-3 font-sans font-normal text-sm leading-5">
            (*) Phí khách tăng thêm: 100.000 đ sau 2 khách
          </p>
        </div>
      </section>
      {/* portfo section */}
      <div className="bg-black h-[145px] relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-[#0D0D0D] px-[52px] py-8 border-[3px] border-dashed border-[#CAAA63] rounded-lg max-w-3xl mx-auto">
          <p className="text-center text-[#CAAA63] font-roboto font-bold text-lg mb-2">
            Nhận phòng: 14:00PM | Trả phòng 12:00PM
          </p>
          <p className="text-center text-base font-playfair font-normal italic leading-7 text-[#F1F3F4]">
            Nếu quý khách có nhu cầu về giờ nhận và trả phòng khác với quy định
            chung của Luxstay, quý khách vui lòng liên hệ số điện thoại{" "}
            <span className="text-[#D9BA75]">18006586 (miễn phí)</span> để được
            hỗ trợ tốt nhất
          </p>
        </div>
      </div>
    </>
  );
}

function PricingCard({ days, price }: { days: string; price: string }) {
  return (
    <div className="bg-black border-2 border-primary rounded-lg overflow-hidden">
      <div className="py-7">
        <h3 className="text-center text-base font-roboto mb-2">{days}</h3>
        <p className="text-center text-4xl font-bold text-[#CAAA63] font-roboto mb-2">
          {price}
        </p>
        <p className="text-center text-sm font-sans font-normal text-base">
          (Có thể thay đổi theo ngày lễ)
        </p>
      </div>
      <Button className="w-full bg-[#CAAA63] text-sm py-5 leading-5 text-[#0D0D0D] rounded-none font-bold font-sans">
        Đặt phòng ngay
      </Button>
    </div>
  );
}
