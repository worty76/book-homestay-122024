import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SecuritySettings() {
  return (
    <>
      <CardHeader>
        <CardTitle>Cài đặt bảo mật</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Mật khẩu</h3>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Mật khẩu hiện tại</Label>
              <Input type="password" id="current-password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">Mật khẩu mới</Label>
              <Input type="password" id="new-password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Xác nhận mật khẩu mới</Label>
              <Input type="password" id="confirm-password" />
            </div>
          </div>
          <Button>Cập nhật mật khẩu</Button>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Xác thực 2 yếu tố</h3>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-0.5">
              <div className="font-medium">Xác thực 2 yếu tố</div>
              <div className="text-sm text-muted-foreground">
                Thêm một lớp bảo mật bổ sung cho tài khoản của bạn
              </div>
            </div>
            <Button variant="outline">Thiết lập</Button>
          </div>
        </div>
      </CardContent>
    </>
  );
}
