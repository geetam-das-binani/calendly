"use client";
import { OnBoardingAction } from "@/actions/onBoarding";
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
import React, { useActionState } from "react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { onBoardingSchema } from "@/lib/schema";
import { SubmitButton } from "../components/SubmitButtons";
const onBoarding = () => {
  const [lastResult, action] = useActionState(OnBoardingAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: onBoardingSchema });
    },
    shouldRevalidate: "onInput",
    shouldValidate: "onBlur",
  });

  return (
    <div className="flex items-center justify-center min-h-screen w-screen">
      <Card>
        <CardHeader>
          <CardTitle className="md:text-2xl text-xl">
            Welcome to Cal<span className="text-primary">endly</span>
          </CardTitle>
          <CardDescription>
            We need the following information to set uo your profile!
          </CardDescription>
        </CardHeader>
        <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
          <CardContent className="flex flex-col gap-y-5">
            <div className="grid gap-y-2">
              <Label>Full Name</Label>
              <Input
                placeholder="John Doe"
                name={fields.fullName.name}
                defaultValue={fields.fullName.initialValue}
                key={fields.fullName.key}
              />
              <p className="text-red-500 text-sm">{fields.fullName.errors}</p>
            </div>
            <div className="grid gap-y-2">
              <Label>Username</Label>
              <div className="flex rounded-md">
                <span className="inline-flex items-center px-3 rounded-l-md border-r-0 border-muted bg-muted text-sm text-muted-foreground">
                  Calendly.com/
                </span>
                <Input
                  placeholder="example-user-1"
                  className="rounded-l-none"
                  name={fields.userName.name}
                  defaultValue={fields.userName.initialValue}
                  key={fields.userName.key}
                />
              </div>
              <p className="text-red-500 text-sm max-w-xs">
                {fields.userName.errors}
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton text="Submit" className="w-full" />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default onBoarding;
