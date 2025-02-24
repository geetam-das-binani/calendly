"use server";

import { prisma } from "@/lib/db";
import requireUser from "@/lib/hooks";

import { onBoardingSchemaValidation } from "@/lib/schema";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";

export const OnBoardingAction = async (prevState: any, formData: FormData) => {
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
  const data = await prisma.user.update({
    where: {
      id: session.user?.id,
    },
    data: {
      username: submission.value.userName,
      name: submission.value.fullName,
    },
  });

  return redirect("/onboarding/grant-id");
};
