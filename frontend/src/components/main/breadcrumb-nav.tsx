"use client";

import { usePathname } from "next/navigation";
import { Home } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbNavProps {
  homeElement?: React.ReactNode;
  separator?: React.ReactNode;
  containerClassName?: string;
  listClassName?: string;
  activeItemClassName?: string;
  darkMode?: boolean;
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({
  homeElement = "Trang chủ",
  separator,
  containerClassName = "",
  listClassName = "",
  activeItemClassName = "",
  darkMode = false,
}) => {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);

  // Translate path segments to Vietnamese labels
  const getPathLabel = (path: string): string => {
    const pathLabels: Record<string, string> = {
      about: "Giới thiệu",
      rooms: "Phòng nghỉ",
      concepts: "Concept thiết kế",
      booking: "Đặt phòng",
      contact: "Liên hệ",
      blog: "Tin tức",
    };

    return pathLabels[path.toLowerCase()] || path;
  };

  return (
    <Breadcrumb
      className={`${containerClassName} ${
        darkMode ? "text-white" : "text-muted-foreground"
      }`}
    >
      <BreadcrumbList className={listClassName}>
        <BreadcrumbItem className="text-xl">
          <BreadcrumbLink
            href="/"
            className={
              darkMode
                ? "text-white/80 hover:text-white"
                : "hover:text-foreground"
            }
          >
            {homeElement}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>

        {pathNames.map((name, index) => {
          const routeTo = `/${pathNames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathNames.length - 1;
          const label = getPathLabel(name);

          return (
            <BreadcrumbItem key={routeTo} className="text-xl">
              {isLast ? (
                <BreadcrumbPage
                  className={`${activeItemClassName} ${
                    darkMode ? "text-white" : "text-foreground"
                  } font-medium`}
                >
                  {label}
                </BreadcrumbPage>
              ) : (
                <>
                  <BreadcrumbLink
                    href={routeTo}
                    className={
                      darkMode
                        ? "text-white hover:text-white"
                        : "hover:text-foreground"
                    }
                  >
                    {label}
                  </BreadcrumbLink>
                  <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
                </>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbNav;
