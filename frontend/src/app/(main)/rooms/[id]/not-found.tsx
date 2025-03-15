import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function RoomNotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[60vh] py-12 text-center">
      <h1 className="text-4xl font-bold mb-4">Phòng không tồn tại</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        Phòng bạn đang tìm kiếm không tồn tại hoặc đã bị xóa. Vui lòng kiểm tra
        lại đường dẫn hoặc xem các phòng khác.
      </p>
      <Button asChild>
        <Link href="/rooms" className="flex items-center gap-2">
          <Home className="h-4 w-4" />
          <span>Xem tất cả phòng</span>
        </Link>
      </Button>
    </div>
  );
}
