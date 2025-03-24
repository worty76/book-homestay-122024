import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Trash2 } from "lucide-react";

export function PaymentMethods() {
  return (
    <>
      <CardHeader>
        <CardTitle>Phương thức thanh toán</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Thẻ đã lưu</h3>
          <div className="grid gap-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <CreditCard className="h-6 w-6" />
                <div>
                  <div className="font-medium">Visa ****4242</div>
                  <div className="text-sm text-muted-foreground">
                    Hết hạn 04/24
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Button>Thêm phương thức thanh toán mới</Button>
        </div>
      </CardContent>
    </>
  );
}
