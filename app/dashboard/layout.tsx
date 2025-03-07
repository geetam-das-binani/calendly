import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/public/logo.png";
import DashBoardLinks from "../components/DashBoardLinks";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { prisma } from "../../lib/db";
import { redirect } from "next/navigation";
import requireUser from "@/lib/hooks";
import { signOut } from "@/lib/auth";
import { Toaster } from "sonner";

async function getData(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      username: true,
      grantId: true,
      grantEmail: true,
    },
  });
  if (!user?.username) {
    return redirect("/onboarding");
  }
  if (!user?.grantId) {
    return redirect("/onboarding/grant-id");
  }
  if (!user?.grantEmail) {
    return redirect("/onboarding/grant-id");
  }
  return user;
}
const DashBoardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await requireUser();
  let data;
  if (session.user?.id) {
    data = await getData(session.user?.id as string);
  }
  
  return (
    <>
      <div className="min-h-screen w-full grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <Image src={logo} alt="Logo" className="size-6" />
                <p className="text-xl font-bold">
                  Cal<span className="text-primary">ednly</span>
                </p>
              </Link>
            </div>
            <div className="flex-1">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                <DashBoardLinks />
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 px-4 lg:h-[60px] lg:px-6 items-center gap-4 border-b bg-muted/40">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  size={"icon"}
                  variant={"outline"}
                  className="md:hidden shrink-0"
                >
                  <Menu size={5} />
                </Button>
              </SheetTrigger>
              <SheetContent side={"left"} className="flex flex-col">
                <SheetHeader>
                  <SheetTitle>
                    Hi,{" "}
                    <span className="text-primary">{session?.user?.name}</span>{" "}
                  </SheetTitle>
                  <nav className="grid gap-2 mt-10">
                    <DashBoardLinks />
                  </nav>
                </SheetHeader>
              </SheetContent>
            </Sheet>
            <div className="ml-auto flex items-center gap-x-4">
            
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={"secondary"}
                    size={"icon"}
                    className="rounded-full"
                  >
                    <img
                      src={session?.user?.image as string}
                      alt="profile image"
                      width={20}
                      height={20}
                      className="w-full h-full rounded-full"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={"/dashboard/settings"}>Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <form
                      action={async () => {
                        "use server";
                        await signOut();
                      }}
                      className="w-full"
                    >
                      <button className="w-full text-left">Log out</button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </div>
        <Toaster richColors/>
      </div>
    </>
  );
};

export default DashBoardLayout;
