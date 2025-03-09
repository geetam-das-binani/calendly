"use server";

import { prisma } from "@/lib/db";
import requireUser from "@/lib/hooks";

import { onBoardingSchemaValidation } from "@/lib/schema";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";

export const OnBoardingAction = async (prevState: any, formData: FormData) => {
  let redirectPath: string | null = null;
  try {
    const session = await requireUser();
    const submission = await parseWithZod(formData, {
      schema: onBoardingSchemaValidation({
        async isUsernameUnique() {
          const exisitngUser = await prisma.user.findUnique({
            where: {
              username: formData.get("userName") as string,
            },
          });
          return !exisitngUser;
        },
      }),

      async: true,
    });

    if (submission.status !== "success") {
      return submission.reply();
    }
    await prisma.user.update({
      where: {
        id: session.user?.id,
      },
      data: {
        username: submission.value.userName,
        name: submission.value.fullName,
        Availability: {
          createMany: {
            data: [
              { day: "Monday", fromTime: "08:00", tillTime: "18:00" },
              { day: "Tuesday", fromTime: "08:00", tillTime: "18:00" },
              { day: "Wednesday", fromTime: "08:00", tillTime: "18:00" },
              { day: "Thursday", fromTime: "08:00", tillTime: "18:00" },
              { day: "Friday", fromTime: "08:00", tillTime: "18:00" },
              { day: "Saturday", fromTime: "08:00", tillTime: "18:00" },
              { day: "Sunday", fromTime: "08:00", tillTime: "18:00" },
            ],
          },
        },
      },
    });
    redirectPath = `/onboarding/grant-id`;
  } catch (error) {
    console.log(error);
  } finally {
    if (redirectPath) {
      redirect(redirectPath);
    }
  }
};
