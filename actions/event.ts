"use server";

import { prisma } from "@/lib/db";
import requireUser from "@/lib/hooks";
import { eventTypeSchema } from "@/lib/schema";
import { parseWithZod } from "@conform-to/zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createEvent = async (prevState: any, formData: FormData) => {
  let redirectPath: string | null = null;
  try {
    const session = await requireUser();
    const submission = parseWithZod(formData, {
      schema: eventTypeSchema,
    });
    if (submission.status !== "success") return submission.reply();
    await prisma.eventType.create({
      data: {
        userId: session.user?.id as string,
        title: submission.value.title,
        duration: submission.value.duration,
        description: submission.value.description,
        url: submission.value.url,
        videoCallSoftware: submission.value.videoCallSoftware,
      },
    });
    redirectPath = `/dashboard`;
  } catch (error) {
    console.log(error);
  } finally {
    if (redirectPath) {
      redirect(redirectPath);
    }
  }
};

export const updateEvent = async (prevState: any, formData: FormData) => {
  let redirectPath: string | null = null;
  try {
    const session = await requireUser();
    const submission = parseWithZod(formData, {
      schema: eventTypeSchema,
    });
    if (submission.status !== "success") return submission.reply();
    await prisma.eventType.update({
      where: {
        id: formData.get("id") as string,
        userId: session.user?.id as string,
      },
      data: {
        userId: session.user?.id as string,
        title: submission.value.title,
        duration: submission.value.duration,
        description: submission.value.description,
        url: submission.value.url,
        videoCallSoftware: submission.value.videoCallSoftware,
      },
    });
    redirectPath = `/dashboard`;
  } catch (error) {
    console.log(error);
  } finally {
    if (redirectPath) {
      redirect(redirectPath);
    }
  }
};

export const toggleEvent = async (
  prevState: any,
  {
    eventTypeId,
    isChecked,
  }: {
    eventTypeId: string;
    isChecked: boolean;
  }
) => {
  try {
    const session = await requireUser();
    await prisma.eventType.update({
      where: {
        id: eventTypeId,
        userId: session.user?.id as string,
      },
      data: {
        active: isChecked,
      },
    });
    revalidatePath("/dashboard");
    return {
      status: "success",
      message: "Event type status updated!",
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Failed to update event type status!",
    };
  }
};
export const deleteEvent = async (formData: FormData) => {
  let redirectPath: string | null = null;
  try {
    const session = await requireUser();
    await prisma.eventType.delete({
      where: {
        id: formData.get("id") as string,
        userId: session.user?.id as string,
      },
    });

    redirectPath = `/dashboard`;
  } catch (error) {
    console.log(error);
  } finally {
    if (redirectPath) redirect(redirectPath);
  }
};
