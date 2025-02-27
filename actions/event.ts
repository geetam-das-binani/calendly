"use server";

import { prisma } from "@/lib/db";
import requireUser from "@/lib/hooks";
import { eventTypeSchema } from "@/lib/schema";
import { parseWithZod } from "@conform-to/zod";

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
