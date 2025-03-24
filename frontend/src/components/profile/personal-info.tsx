import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function PersonalInfo() {
  return (
    <>
      <CardHeader>
        <CardTitle>Thông tin cá nhân</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Tên</Label>
            <Input id="name" defaultValue="Đạt Lê Thành" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Địa chỉ email</Label>
            <Input
              id="email"
              type="email"
              defaultValue="lethanhdatsv2@gmail.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Số điện thoại</Label>
            <Input id="phone" type="tel" placeholder="Thêm số điện thoại" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dob">Ngày sinh</Label>
            <Input id="dob" type="date" placeholder="Nhập ngày sinh" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nationality">Quốc tịch</Label>
            <Input id="nationality" placeholder="Chọn vùng/quốc gia" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Giới tính</Label>
            <Input id="gender" placeholder="Chọn giới tính" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Địa chỉ</Label>
            <Input id="address" placeholder="Nhập địa chỉ" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="passport">Thông tin hộ chiếu</Label>
            <Input id="passport" placeholder="Chưa cung cấp" />
          </div>
        </div>
        <div className="flex justify-end">
          <Button>Lưu thay đổi</Button>
        </div>
      </CardContent>
    </>
  );
}
