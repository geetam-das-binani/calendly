import { prisma } from "@/lib/db";
import requireUser from "@/lib/hooks";
import { notFound } from "next/navigation";
import React from "react";
import EmptyState from "../components/EmptyState";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink, Pen, Settings, Trash, Users2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CopyLinkMenu from "../components/CopyLinkMenu";
import EventTypeSwitcher from "../components/EventTypeSwitcher";

async function getData(id: string) {
  const data = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      username: true,
      EventType: {
        select: {
          id: true,
          active: true,
          title: true,
          url: true,
          duration: true,
        },
      },
    },
  });
  if (!data) return notFound();
  return data;
}

const DashBoard = async () => {
  const session = await requireUser();
  const data = await getData(session.user?.id!);

  return (
    <>
      {data.EventType.length === 0 ? (
        <EmptyState
          title="You have no Events"
          description="Click the button below to create your first event type"
          href="/dashboard/new"
          buttonText="Add event type"
        />
      ) : (
        <>
          <div className="flex items-center justify-between px-2">
            <div className="hidden sm:grid gap-y-1">
              <h1 className="text-3xl md:text-4xl font-semibold">
                Event Types
              </h1>
              <p className="text-muted-foreground ">
                Create and manage your event types right here.
              </p>
            </div>
            <Button asChild>
              <Link href={"/dashboard/new"}>Create New Event</Link>
            </Button>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data?.EventType.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-lg border relative"
              >
                <div className="absolute top-2 right-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant={"outline"} size={"icon"}>
                        {" "}
                        <Settings className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Event</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                          <Link
                            href={`${process.env.NEXT_PUBLIC_URL}/${data.username}/${item.url}`}
                          >
                            <ExternalLink className="size-4 mr-2" />
                            Preview
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <CopyLinkMenu
                            meetingUrl={`${process.env.NEXT_PUBLIC_URL}/${data.username}/${item.url}`}
                          />
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/event/${item.id}`}>
                            <Pen className="mr-2 size-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Trash className="size-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <Link href={"/"} className="flex items-center p-5">
                  <div className="flex-shrink-0">
                    <Users2 className="size-6" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-muted-foreground">
                        {item.duration} Minutes Meeting
                      </dt>
                      <dd className="text-lg font-medium">{item.title}</dd>
                    </dl>
                  </div>
                </Link>
                <div className="bg-muted justify-between items-center py-3 flex px-2">
                  <EventTypeSwitcher
                    eventTypeId={item.id}
                    initialChecked={item.active}
                  />

                  <Button asChild>
                    <Link href={`/dashboard/event/${item.id}`}>Edit Event</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default DashBoard;
