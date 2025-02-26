"use server";
import { prisma } from "@/lib/db";
import requireUser from "@/lib/hooks";
import { settingsSchema } from "@/lib/schema";
import { parseWithZod } from "@conform-to/zod";

export const settingsAction = async (prevState: any, formData: FormData) => {
  try {
    const session = await requireUser();
    const submission = parseWithZod(formData, {
      schema: settingsSchema,
    });

    if (submission.status !== "success") return submission.reply();

    await prisma.user.update({
      where: {
        id: session.user?.id,
      },
      data: {
        name: submission.value.fullName,
        image: submission.value.profileImage,
      },
    });

  
  } catch (error) {
    console.error(error);
  }
};
