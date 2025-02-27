"use client";
import { createEvent } from "@/actions/event";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/buttonGroup";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { eventTypeSchema } from "@/lib/schema";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import Link from "next/link";
import { useActionState, useState } from "react";

type VideoCallProvider = "Google Meet" | "Zoom Meeting" | "Microsoft Teams";
const NewEvent = () => {
  const [activePlatform, setActivePlatform] =
    useState<VideoCallProvider>("Google Meet");
  const [lastResult, action] = useActionState(createEvent, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: eventTypeSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  return (
    <div className="w-full h-full flex flex-1 items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Add new appointment type</CardTitle>
          <CardDescription>
            Create new appointment type that allows people to book you!
          </CardDescription>
        </CardHeader>
        <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
          <CardContent className="grid gap-y-5">
            <div className="flex flex-col gap-y-2">
              <Label>Title</Label>
              <Input
                name={fields.title.name}
                key={fields.title.key}
                value={fields.title.initialValue}
                placeholder="30 Minutes meeting"
              />
              {fields.title.errors && (
                <p className="text-red-500 text-sm">{fields.title.errors}</p>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>URL Slug</Label>
              <div className="flex rounded-md">
                <span className="inline-flex items-center px-3 rounded-l-md border-r-0 border-muted bg-muted text-sm text-muted-foreground">
                  Calendly.com/
                </span>
                <Input
                  name={fields.url.name}
                  key={fields.url.key}
                  value={fields.url.initialValue}
                  className="rounded-l-none"
                  placeholder="Example-url-1"
                />
              </div>
              {fields.url.errors && (
                <p className="text-red-500 text-sm">{fields.url.errors}</p>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Description</Label>
              <Textarea
                name={fields.description.name}
                key={fields.description.key}
                value={fields.description.initialValue}
                placeholder="Meet me in this meeting"
              />
              {fields.description.errors && (
                <p className="text-red-500 text-sm">
                  {fields.description.errors}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Durtation</Label>
              <Select
                name={fields.duration.name}
                key={fields.duration.key}
                value={fields.duration.initialValue}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Duration</SelectLabel>
                    <SelectItem value="15">15 Mins</SelectItem>
                    <SelectItem value="30">30 Mins</SelectItem>
                    <SelectItem value="45">45 Mins</SelectItem>
                    <SelectItem value="60">1 Hour</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {fields.duration.errors && (
                <p className="text-red-500 text-sm">{fields.duration.errors}</p>
              )}
            </div>
            <div className="grid gap-y-2">
              <Label>Video Call Provider</Label>
              <input
                name={fields.videoCallSoftware.name}
                key={fields.videoCallSoftware.key}
                value={activePlatform}
                type="hidden"
              />
              <ButtonGroup className="gap-2">
                <Button
                  type="button"
                  variant={
                    activePlatform === "Zoom Meeting" ? "secondary" : "outline"
                  }
                  onClick={() => setActivePlatform("Zoom Meeting")}
                  className="w-full "
                >
                  Zoom
                </Button>
                <Button
                  type="button"
                  variant={
                    activePlatform === "Google Meet" ? "secondary" : "outline"
                  }
                  onClick={() => setActivePlatform("Google Meet")}
                  className="w-full "
                >
                  Google Meet
                </Button>
                <Button
                  type="button"
                  variant={
                    activePlatform === "Microsoft Teams"
                      ? "secondary"
                      : "outline"
                  }
                  onClick={() => setActivePlatform("Microsoft Teams")}
                  className="w-full "
                >
                  Microsoft Teams
                </Button>
              </ButtonGroup>
              {fields.videoCallSoftware.errors && (
                <p className="text-red-500 text-sm">
                  {fields.videoCallSoftware.errors}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="w-full flex justify-between">
            <Button variant={"secondary"} asChild>
              <Link href={"/dashboard"}>Cancel</Link>
            </Button>
            <SubmitButton text="Create Event Type" />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default NewEvent;
