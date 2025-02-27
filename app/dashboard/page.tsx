import { prisma } from "@/lib/db";
import requireUser from "@/lib/hooks";
import { notFound } from "next/navigation";
import React from "react";
import EmptyState from "../components/EmptyState";

async function getData(id: string) {
  const data = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      username: true,
      EventType: {
        select: {
          id: true,
          active: true,
          title: true,
          url: true,
          duration: true,
        },
      },
    },
  });
  if (!data) return notFound();
  return data;
}

const DashBoard = async () => {
  const session = await requireUser();
  const data = await getData(session.user?.id!);

  return (
    <>
      {data.EventType.length === 0 ? (
        <EmptyState
          title="You have no Events"
          description="Click the button below to create your first event type"
          href="/dashboard/new"
          buttonText="Add event type"
        />
      ) : (
        data.EventType.map((event) => (
          <div key={event.id}>
            <p>{event.title}</p>
            <p>{event.duration}</p>
            <p>{event.url}</p>
            <p>{event.active && "wow"}</p>
          </div>
        ))
      )}
    </>
  );
};

export default DashBoard;
