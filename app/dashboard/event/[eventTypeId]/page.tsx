import EditEventTypeForm from "@/app/components/EditEventTypeForm";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import React from "react";

async function getData(id: string) {
  const data = await prisma.eventType.findUnique({
    where: {
      id,
    },
    select: {
      title: true,
      description: true,
      duration: true,
      url: true,
      videoCallSoftware: true,
    },
  });
  if (!data) return notFound();
  return data;
}
const page = async ({ params }: { params: { eventTypeId: string } }) => {
  const { eventTypeId } =  params;
  const data =await  getData(eventTypeId);
  return (
    <EditEventTypeForm
      callProvider={data.videoCallSoftware}
      description={data.description}
      duration={data.duration}
      id={eventTypeId}
      title={data.title}
      url={data.url}
    />
  );
};

export default page;
