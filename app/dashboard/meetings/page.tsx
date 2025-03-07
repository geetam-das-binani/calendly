import EmptyState from "@/app/components/EmptyState";
import { SubmitButton } from "@/app/components/SubmitButtons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/db";
import requireUser from "@/lib/hooks";
import { nylas } from "@/lib/nylas";
import { format, fromUnixTime } from "date-fns";
import { VideoIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { cancelMeeting } from "@/actions/meeting";
async function getData(id: string) {
  const userData = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      grantEmail: true,
      grantId: true,
    },
  });
  if (!userData) throw new Error("User not found");
  const data = await nylas.events.list({
    identifier: userData.grantId as string,
    queryParams: {
      calendarId: userData.grantEmail as string,
    },
  });
  return data;
}
const Meetings = async () => {
  const session = await requireUser();
  const data = await getData(session?.user?.id!);

  return (
    <>
      {data?.data.length < 1 ? (
        <EmptyState
          title="No Meeings"
          description="You dont have any meetings yet."
          buttonText="Create a new event type"
          href="/dashboard/new"
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Bookings</CardTitle>
            <CardDescription>
              See upcoming event which booked with you and see the event type
              link.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {data.data.map((item:any) => (
              <form action={cancelMeeting}>
                <div
                  key={item.id}
                  className="grid grid-cols-3 justify-between items-center"
                >
                  <input type="hidden" name="eventId" value={item.id} />
                  <div>
                    <p className="text-muted-foreground text-sm">
                      {format(fromUnixTime(item.when.startTime), "EEE, dd MMM")}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {format(fromUnixTime(item.when.startTime), "hh:mm a")}-
                      {format(fromUnixTime(item.when.endTime), "hh:mm a")}
                    </p>
                    <div className="flex items-center mt-1">
                      <VideoIcon className="text-primary mr-2 size-4" />
                      <Link
                        target="_blank"
                        className="text-xs text-primary underline underline-offset-4"
                        href={item.conferencing.details.url}
                      >
                        Join Meeting
                      </Link>
                    </div>
                  </div>
                  <div className="flex flex-col items-start">
                    <h2 className="text-sm font-medium">{item.title}</h2>
                    <p className="text-sm text-muted-foreground">
                      You an {item.participants[0].name} are attending
                    </p>
                  </div>
                  <SubmitButton
                    text="Cancel Meeting"
                    variant={"destructive"}
                    className="w-fit flex ml-auto"
                  />
                </div>
                <Separator className="my-3" />
              </form>
            ))}
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Meetings;
