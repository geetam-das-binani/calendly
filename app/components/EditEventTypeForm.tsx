"use client";
import { eventTypeSchema } from "@/lib/schema";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import React, { useActionState, useState } from "react";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { Button } from "@/components/ui/button";

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
import Link from "next/link";
import { updateEvent } from "@/actions/event";
type VideoCallProvider = "Google Meet";
interface EditEventTypeFormProps {
  id: string;
  title: string;
  url: string;
  description: string;
  duration: number;
  callProvider: string;
}
const EditEventTypeForm = ({
  callProvider,
  description,
  duration,
  id,
  title,
  url,
}: EditEventTypeFormProps) => {
  const [activePlatform, setActivePlatform] = useState<VideoCallProvider>(
    callProvider as VideoCallProvider
  );
  const [lastResult, action] = useActionState(updateEvent, undefined);
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
          <CardTitle>Edit appointment type</CardTitle>
          <CardDescription>
            Edit your appointment type that allows people to book you!
          </CardDescription>
        </CardHeader>
        <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
          <CardContent className="grid gap-y-5">
            <input type="hidden" name="id" value={id} />
            <div className="flex flex-col gap-y-2">
              <Label>Title</Label>
              <Input
                name={fields.title.name}
                key={fields.title.key}
                defaultValue={title}
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
                  defaultValue={url}
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
                defaultValue={description}
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
                defaultValue={duration.toString()}
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

              <Button
                type="button"
                variant={"secondary"}
                onClick={() => setActivePlatform("Google Meet")}
                className="w-full "
              >
                Google Meet
              </Button>

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
            <SubmitButton text="Edit Event Type" />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default EditEventTypeForm;
