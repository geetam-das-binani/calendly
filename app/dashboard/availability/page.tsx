import { updateAvailability } from "@/actions/availability";
import { SubmitButton } from "@/app/components/SubmitButtons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { prisma } from "@/lib/db";
import requireUser from "@/lib/hooks";
import { times } from "@/lib/times";
import { Availability as UserAvailability } from "@prisma/client";
import { notFound } from "next/navigation";
import React from "react";

async function getData(id: string) {
  const data = await prisma.availability.findMany({
    where: {
      userId: id,
    },
  });
  if (data && data.length > 0) return data;
  return notFound();
}
const Availability = async () => {
  const session = await requireUser();
  let data: Array<UserAvailability> = [];
  if (session.user?.id) {
    data = await getData(session.user?.id as string);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Availability</CardTitle>
        <CardDescription>
          In this section you can manage your availability
        </CardDescription>
      </CardHeader>
      <form action={updateAvailability}>
        <CardContent className="flex flex-col gap-y-4">
          {data?.map((item) => {
            return (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center gap-4"
                key={item.id}
              >
                <input type="hidden" name={`id-${item.id}`} value={item.id} />
                <div className="flex items-center gap-x-3">
                  <Switch
                    name={`isActive-${item.id}`}
                    defaultChecked={item.isActive}
                  />
                  <p>{item.day}</p>
                </div>

                <Select
                  name={`fromTime-${item.id}`}
                  defaultValue={item.fromTime}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="From Time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {times.map((time) => (
                        <SelectItem key={time.id} value={time.time}>
                          {time.time}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Select
                  name={`tillTime-${item.id}`}
                  defaultValue={item.tillTime}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Till Time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {times.map((time) => (
                        <SelectItem key={time.id} value={time.time}>
                          {time.time}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            );
          })}
        </CardContent>
        <CardFooter>
          <SubmitButton text="Save Changes" />
        </CardFooter>
      </form>
    </Card>
  );
};

export default Availability;
