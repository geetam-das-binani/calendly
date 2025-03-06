import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/db";
import { CalendarX2, ClockIcon, VideoIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import React from "react";
import Image from "next/image";
import RenderCalendar from "@/app/components/BookingForm/RenderCalendar";
import TimeTable from "@/app/components/BookingForm/TimeTable";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { CreateMeeting } from "@/actions/meeting";

async function getData(username: string, url: string) {
  const data = await prisma.eventType.findFirst({
    where: {
      url,
      user: {
        username,
      },
      active: true,
    },
    select: {
      id: true,
      description: true,
      duration: true,
      title: true,
      videoCallSoftware: true,
      user: {
        select: {
          image: true,
          name: true,
          Availability: {
            select: {
              day: true,
              isActive: true,
            },
          },
        },
      },
    },
  });

  if (!data) return notFound();

  return data;
}
const BookingForm = async ({
  params,
  searchParams,
}: {
  params: { username: string; eventurl: string };
  searchParams: { date?: string; time?: string };
}) => {
  const { username, eventurl } = await params;
  const selectedDate = searchParams.date
    ? new Date(searchParams.date)
    : new Date();
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(selectedDate);

  const data = await getData(username, eventurl);
  const showForm = !!searchParams.date && !!searchParams.time;
  return (
    <div className="min-h-screen flex items-center w-screen justify-center">
      {showForm ? (
        <Card className="max-w-[600px] w-full mx-auto">
          <CardContent className="p-5 gap-4 grid md:grid-cols-[1fr,auto,1fr] md:gap-4">
            <div>
              <Image
                src={data.user.image as string}
                alt={`${data.user.name}'s profile picture`}
                className="size-9 rounded-full"
                width={30}
                height={30}
              />
              <p className="text-sm font-medium text-muted-foreground mt-1">
                {data.user?.name ?? ""}
              </p>
              <h1 className="text-xl font-semibold mt-2">{data.title ?? ""}</h1>

              <p className="text-sm font-medium text-muted-foreground">
                {data.description ?? ""}
              </p>
              <div className="mt-5 flex flex-col gap-y-3">
                <p className="flex items-center">
                  <CalendarX2 className="size-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {formattedDate}
                  </span>
                </p>
                <p className="flex items-center">
                  <ClockIcon className="size-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {data.duration ?? ""}{" "}
                  </span>
                </p>{" "}
                <p className="flex items-center">
                  <VideoIcon className="size-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {data.videoCallSoftware ?? ""}{" "}
                  </span>
                </p>
              </div>
            </div>
            <Separator
              orientation="vertical"
              className="hidden md:block h-full w-[1px]"
            />
            <form action={CreateMeeting} className="flex flex-col gap-y-4">
              <input name="fromTime" hidden value={searchParams.time} />
              <input name="eventDate" hidden value={searchParams.date} />
              <input name="meetingLength" hidden value={data.duration} />
              <input name="provider" hidden value={data.videoCallSoftware} />
              <input name="username" hidden value={username} />
              <input name="eventTypeId" hidden value={data.id} />
              <div className="flex flex-col gap-y-2">
                <Label>Your Name</Label>
                <Input name="name" placeholder="Your Name" />
              </div>

              <div className="flex flex-col gap-y-2">
                <Label>Your Email</Label>
                <Input name="email" placeholder="Your Email" />
              </div>
              <SubmitButton text="Book Meeting" className="w-full mt-5" />
            </form>
            {/* <RenderCalendar availability={data?.user?.Availability || []} />
         <Separator
           orientation="vertical"
           className="hidden md:block h-full w-[1px]"
         /> */}
            {/* <TimeTable
           meetingDuration={data.duration}
           selectedDate={selectedDate}
           userName={username}
         /> */}
          </CardContent>
        </Card>
      ) : (
        <Card className="max-w-[1000px] w-full mx-auto">
          <CardContent className="p-5 md:grid md:grid-cols-[1fr,auto,1fr,auto,1fr] md:gap-4">
            <div>
              <Image
                src={data.user.image as string}
                alt={`${data.user.name}'s profile picture`}
                className="size-9 rounded-full"
                width={30}
                height={30}
              />
              <p className="text-sm font-medium text-muted-foreground mt-1">
                {data.user?.name ?? ""}
              </p>
              <h1 className="text-xl font-semibold mt-2">{data.title ?? ""}</h1>

              <p className="text-sm font-medium text-muted-foreground">
                {data.description ?? ""}
              </p>
              <div className="mt-5 flex flex-col gap-y-3">
                <p className="flex items-center">
                  <CalendarX2 className="size-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {formattedDate}
                  </span>
                </p>
                <p className="flex items-center">
                  <ClockIcon className="size-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {data.duration ?? ""}{" "}
                  </span>
                </p>{" "}
                <p className="flex items-center">
                  <VideoIcon className="size-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {data.videoCallSoftware ?? ""}{" "}
                  </span>
                </p>
              </div>
            </div>
            <Separator
              orientation="vertical"
              className="hidden md:block h-full w-[1px]"
            />

            <RenderCalendar availability={data?.user?.Availability || []} />
            <Separator
              orientation="vertical"
              className="hidden md:block h-full w-[1px]"
            />
            <TimeTable
              meetingDuration={data.duration}
              selectedDate={selectedDate}
              userName={username}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BookingForm;
