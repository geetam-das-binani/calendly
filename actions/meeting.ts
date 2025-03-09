"use server";

import { prisma } from "@/lib/db";
import requireUser from "@/lib/hooks";
import { nylas } from "@/lib/nylas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const CreateMeeting = async (formData: FormData) => {
  const session = await requireUser();
  let redirectPath: string | null = "";
  try {
    const getUserData = await prisma.user.findUnique({
      where: {
        id: session?.user?.id,
        username: formData.get("username") as string,
      },
      select: {
        grantEmail: true,
        grantId: true,
      },
    });
    if (!getUserData) throw new Error("User not found");
    const eventType = await prisma.eventType.findUnique({
      where: {
        id: formData.get("eventTypeId") as string,
      },
      select: {
        title: true,
        description: true,
      },
    });
    const fromTime = formData.get("fromTime") as string;
    const eventDate = formData.get("eventDate") as string;
    const meetingLength = Number(formData.get("meetingLength"));
    const provider = formData.get("provider") as string;
    const startDate = new Date(`${eventDate}T${fromTime}:00`);
    const endDate = new Date(startDate.getTime() + meetingLength * 60000);

    await nylas.events.create({
      identifier: getUserData.grantId as string,
      requestBody: {
        title: eventType?.title,
        description: eventType?.description,
        when: {
          startTime: Math.floor(startDate.getTime() / 1000),
          endTime: Math.floor(endDate.getTime() / 1000),
        },
        conferencing: {
          autocreate: {},

          provider: provider as any,
        },
        participants: [
          {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            status: "yes",
          },
        ],
      },
      queryParams: {
        calendarId: getUserData.grantEmail as string,
        notifyParticipants: true,
      },
    });
    redirectPath = `/success`;
  } catch (error: any) {
    console.error(error.message);
  } finally {
    if (redirectPath) {
      return redirect(redirectPath);
    }
  }
};

export const cancelMeeting = async (formData: FormData) => {
  const session = await requireUser();

  try {
    const getUserData = await prisma.user.findUnique({
      where: {
        id: session?.user?.id,
      },
      select: {
        grantEmail: true,
        grantId: true,
      },
    });
    if (!getUserData) throw new Error("User not found");

    await nylas.events.destroy({
      eventId: formData.get("eventId") as string,
      identifier: getUserData.grantId as string,
      queryParams: {
        calendarId: getUserData.grantEmail as string,
      },
    });
    revalidatePath("/dashboard/meetings");
  } catch (error) {
    console.error(error);
  }
};
