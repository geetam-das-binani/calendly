import SettingsForm from "@/app/components/SettingsForm";
import { prisma } from "@/lib/db";
import requireUser from "@/lib/hooks";
import { notFound } from "next/navigation";
import React from "react";
import { Toaster } from "sonner";

async function getData(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      name: true,
      email: true,
      image: true,
    },
  });
  if (!user) return notFound();

  return user;
}
const Settings = async () => {
  const session = await requireUser();
  const userData = await getData(session.user?.id as string);
  return (
    <div>
      <SettingsForm
        email={userData.email as string}
        name={userData.name as string}
        image={userData.image as string}
      />
      <Toaster richColors/>
    </div>
  );
};

export default Settings;
