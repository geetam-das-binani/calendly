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
      user: { username },
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
          Availability: { select: { day: true, isActive: true } },
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
  searchParams: { date: string; time: string };
}) => {
  const { username, eventurl } =  params;
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
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {showForm ? (
        <Card className="w-full max-w-lg mx-auto">
          <CardContent className="p-5 grid gap-4 md:grid-cols-2">
            <div>
              <Image
                src={data.user.image ?? ""}
                alt={`${data.user.name}'s profile picture`}
                className="w-10 h-10 rounded-full"
                width={40}
                height={40}
              />
              <p className="text-sm font-medium text-muted-foreground mt-1">
                {data.user?.name ?? ""}
              </p>
              <h1 className="text-xl font-semibold mt-2">{data.title ?? ""}</h1>
              <p className="text-sm font-medium text-muted-foreground">
                {data.description ?? ""}
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <p className="flex items-center">
                  <CalendarX2 className="w-4 h-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {formattedDate}
                  </span>
                </p>
                <p className="flex items-center">
                  <ClockIcon className="w-4 h-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {data.duration ?? ""}
                  </span>
                </p>
                <p className="flex items-center">
                  <VideoIcon className="w-4 h-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {data.videoCallSoftware ?? ""}
                  </span>
                </p>
              </div>
            </div>
            <Separator className="hidden md:block h-full w-[1px]" />
            <form action={CreateMeeting} className="flex flex-col gap-4">
              <input name="fromTime" hidden value={searchParams.time} />
              <input name="eventDate" hidden value={searchParams.date} />
              <input name="meetingLength" hidden value={data.duration} />
              <input name="provider" hidden value={data.videoCallSoftware} />
              <input name="username" hidden value={username} />
              <input name="eventTypeId" hidden value={data.id} />
              <div>
                <Label>Your Name</Label>
                <Input name="name" placeholder="Your Name" required />
              </div>
              <div>
                <Label>Your Email</Label>
                <Input name="email" placeholder="Your Email" required />
              </div>
              <SubmitButton text="Book Meeting" className="w-full mt-5" />
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full max-w-4xl mx-auto">
          <CardContent className="p-5 grid gap-4 md:grid-cols-[1fr,auto,1fr,auto,1fr]">
            <div>
              <Image
                src={data.user.image as string}
                alt={`${data.user.name}'s profile picture`}
                className="w-10 h-10 rounded-full"
                width={40}
                height={40}
              />
              <p className="text-sm font-medium text-muted-foreground mt-1">
                {data.user?.name ?? ""}
              </p>
              <h1 className="text-xl font-semibold mt-2">{data.title ?? ""}</h1>
              <p className="text-sm font-medium text-muted-foreground">
                {data.description ?? ""}
              </p>
            </div>
            <Separator className="hidden md:block h-full w-[1px]" />
            <RenderCalendar availability={data?.user?.Availability || []} />
            <Separator className="hidden md:block h-full w-[1px]" />
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
