import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function BookingForm() {
  return (
    <div className="relative">
      <div className="absolute inset-0">
        <img
          src="/images/Feedback(1).png"
          alt="Luxury Room"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        <form className="flex justify-center flex-col md:flex-row gap-2 mx-auto font-sans">
          <Input
            type="text"
            placeholder="Họ tên *"
            className="bg-white text-black font-normal text-sm leading-5"
          />
          <Input
            type="email"
            placeholder="Email *"
            className="bg-white text-black font-normal text-sm leading-5"
          />
          <Input
            type="tel"
            placeholder="Số điện thoại"
            className="bg-white text-black font-normal text-sm leading-5"
          />
          <Button className="bg-[#CAAA63] text-sm text-[#0D0D0D] font-bold leading-5 py-4 px-3 font-sans">
            ĐẶT PHÒNG NGAY
          </Button>
        </form>
      </div>
    </div>
  );
}
