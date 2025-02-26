"use server";

import { prisma } from "@/lib/db";
import requireUser from "@/lib/hooks";
import { revalidatePath } from "next/cache";

export const updateAvailability = async (formData: FormData) => {
  await requireUser();
  try {
    const rawData = Object.fromEntries(formData.entries()); // Convert to an object

    const availabilityData = Object.keys(rawData)
      .filter((key) => key.startsWith("id-"))
      .map((key) => {
        const id = key.replace("id-", "");
        return {
          id,
          isActive: rawData[`isActive-${id}`] === "on",
          fromTime: rawData[`fromTime-${id}`] as string,
          tillTime: rawData[`tillTime-${id}`] as string,
        };
      });

    await prisma.$transaction(async (tx) => {
      for (const item of availabilityData) {
        await tx.availability.update({
          where: { id: item.id },
          data: {
            isActive: item.isActive,
            fromTime: item.fromTime,
            tillTime: item.tillTime,
          },
        });
      }
    });
    revalidatePath("/dashboard/availability");
  } catch (error) {
    console.error("Error updating availability:", error);
  }
};
