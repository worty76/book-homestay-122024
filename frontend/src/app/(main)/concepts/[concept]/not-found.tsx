import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function ConceptNotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[60vh] py-12 text-center">
      <h1 className="text-4xl font-bold mb-4">Concept không tồn tại</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        Concept bạn đang tìm kiếm không tồn tại hoặc đã bị xóa. Vui lòng kiểm
        tra lại đường dẫn hoặc xem các concept khác.
      </p>
      <Button asChild>
        <Link href="/" className="flex items-center gap-2">
          <Home className="h-4 w-4" />
          <span>Quay về trang chủ</span>
        </Link>
      </Button>
    </div>
  );
}
