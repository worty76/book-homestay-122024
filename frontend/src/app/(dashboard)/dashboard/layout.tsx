"use client";

import Link from "next/link";
import {
  Bell,
  CircleUser,
  Home,
  BarChart3,
  Menu,
  BedDouble,
  CalendarDays,
  Search,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuthStore } from "@/store/useAuthStore";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import LanguageSwitcher from "@/components/language-switcher";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { language, translations, setTranslations } = useLanguageStore();
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const loadTranslations = async () => {
      const messages = (await import(`@/translations/${language}.json`))
        .default;
      setTranslations(messages);
    };
    loadTranslations();
  }, [language, setTranslations]);

  const t = (key: string): string => {
    return (
      key.split(".").reduce((o, i) => {
        if (typeof o === "object" && o !== null) {
          return o[i];
        }
        return key;
      }, translations as any) || key
    );
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Home className="h-6 w-6" />
              <span className="truncate">Homestay Admin</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1 overflow-auto">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="/dashboard"
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                  pathname === "/dashboard"
                    ? "bg-muted text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <BarChart3 className="h-4 w-4 shrink-0" />
                <span className="truncate">Overview</span>
              </Link>
              <Link
                href="/dashboard/rooms"
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                  pathname === "/dashboard/rooms"
                    ? "bg-muted text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <BedDouble className="h-4 w-4 shrink-0" />
                <span className="truncate">Rooms</span>
              </Link>
              <Link
                href="/dashboard/bookings"
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                  pathname === "/dashboard/bookings"
                    ? "bg-muted text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <CalendarDays className="h-4 w-4 shrink-0" />
                <span className="truncate">Bookings</span>
              </Link>
              <Link
                href="/dashboard/users"
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                  pathname === "/dashboard/users"
                    ? "bg-muted text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <Users className="h-4 w-4 shrink-0" />
                <span className="truncate">Users</span>
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="/dashboard"
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${
                    pathname === "/dashboard"
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  <BarChart3 className="h-5 w-5" />
                  Overview
                </Link>
                <Link
                  href="/dashboard/rooms"
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${
                    pathname === "/dashboard/rooms"
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  <BedDouble className="h-5 w-5" />
                  Rooms
                </Link>
                <Link
                  href="/dashboard/bookings"
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${
                    pathname === "/dashboard/bookings"
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  <CalendarDays className="h-5 w-5" />
                  Bookings
                </Link>
                <Link
                  href="/dashboard/users"
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${
                    pathname === "/dashboard/users"
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  <Users className="h-5 w-5" />
                  Users
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <LanguageSwitcher />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
