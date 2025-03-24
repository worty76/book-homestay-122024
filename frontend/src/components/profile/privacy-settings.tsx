import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PrivacySettings() {
  return (
    <>
      <CardHeader>
        <CardTitle>Quản lý quyền riêng tư và dữ liệu</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Thông báo</h3>
          <div className="grid gap-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-0.5">
                <div className="font-medium">Email thông báo</div>
                <div className="text-sm text-muted-foreground">
                  Nhận thông báo về đặt phòng và ưu đãi
                </div>
              </div>
              <Button variant="outline">Tùy chỉnh</Button>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-0.5">
                <div className="font-medium">Thông báo đẩy</div>
                <div className="text-sm text-muted-foreground">
                  Nhận thông báo trên thiết bị
                </div>
              </div>
              <Button variant="outline">Tùy chỉnh</Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Dữ liệu cá nhân</h3>
          <div className="grid gap-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-0.5">
                <div className="font-medium">Tải xuống dữ liệu</div>
                <div className="text-sm text-muted-foreground">
                  Tải xuống bản sao dữ liệu của bạn
                </div>
              </div>
              <Button variant="outline">Tải xuống</Button>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-0.5">
                <div className="font-medium text-destructive">
                  Xóa tài khoản
                </div>
                <div className="text-sm text-muted-foreground">
                  Xóa vĩnh viễn tài khoản và dữ liệu của bạn
                </div>
              </div>
              <Button variant="destructive">Xóa tài khoản</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </>
  );
}
