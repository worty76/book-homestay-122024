import { Title } from "./Title";

export function About() {
  return (
    <div
      id="about"
      className="py-10 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8"
      style={{ backgroundImage: 'url("/images/testimonial-bg.png")' }}
    >
      <Title subtitle="Luxury" title="ABOUT" />
      <p className="text-sm sm:text-lg text-center max-w-[90%] sm:max-w-[85%] md:max-w-[80%] lg:max-w-[946.57px] mx-auto mt-3 sm:mt-4 md:mt-5 font-roboto text-black font-[400] z-20 leading-relaxed">
        Để có thể cảm nhận hết và hòa nhập với thời tiết ôn đới đặc trưng của Đà
        Lạt, Danh Tiến Villa được thiết kế theo không gian mở giúp lấy tối đa
        ánh sáng tự nhiên cho toàn khách sạn. Tất cả các phòng đều có cửa sổ
        thoáng mát, ban công với tầm nhìn thoáng đẹp, diện tích phòng rộng rãi,
        nội thất cao cấp, tiện nghi và dịch vụ sẽ xóa tan những bộn bề lo toan
        trong cuộc sống, giúp gia đình bạn có một kỳ nghỉ dưỡng tuyệt vời tại
        Thành phố cao nguyên ngàn hoa Đà Lạt.
      </p>
    </div>
  );
}
