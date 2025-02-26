"use client";
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
import { useForm } from "@conform-to/react";
import React, { useActionState, useState } from "react";
import { SubmitButton } from "./SubmitButtons";
import { settingsAction } from "@/actions/settiings";
import { parseWithZod } from "@conform-to/zod";
import { settingsSchema } from "@/lib/schema";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { File, MoveLeftIcon, X } from "lucide-react";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
interface UserProps {
  name: string;
  email: string;
  image: string;
}

const SettingsForm = ({ email, image, name }: UserProps) => {
  const [lastResult, action] = useActionState(settingsAction, undefined);
  const navigate = useRouter();
  const [currentProfileImage, setCurrentProfileImage] = useState(image || "");
  const [form, fields] = useForm({
    lastResult,
    onValidate: ({ formData }) =>
      parseWithZod(formData, { schema: settingsSchema }),
    shouldRevalidate: "onInput",
    shouldValidate: "onBlur",
  });

  const handleDeleteImage = () => setCurrentProfileImage("");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your account settings.</CardDescription>
      </CardHeader>
      <form noValidate id={form.id} onSubmit={form.onSubmit} action={action}>
        <CardContent className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-2">
            <Label>Full Name</Label>
            <Input
              name={fields.fullName.name}
              key={fields.fullName.key}
              placeholder="Jan Marshall"
              defaultValue={name}
            />
            {fields.fullName.errors && (
              <p className="text-red-500 text-sm">{fields.fullName.errors}</p>
            )}
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Email</Label>
            <Input disabled placeholder="Jan Marshall" defaultValue={email} />
          </div>

          <div className="grid gap-y-5">
            <Label>Profile Image</Label>
            <input
              type="hidden"
              name={fields.profileImage.name}
              key={fields.profileImage.key}
              value={currentProfileImage}
            />
            {currentProfileImage ? (
              <div className="relative size-16">
                <Image
                  src={currentProfileImage}
                  alt="Profile"
                  width={300}
                  height={300}
                  className="rounded-lg size-16"
                />
                <Button
                  type="button"
                  onClick={handleDeleteImage}
                  variant="destructive"
                  size="icon"
                  className="absolute -top-3 -right-3"
                >
                  <X className="size-4" />
                </Button>
              </div>
            ) : (
              <CldUploadWidget
                uploadPreset="calendly"
                onSuccess={(result, { widget }) => {
                  const data = result.info as CloudinaryUploadWidgetInfo;
                  if (data) {
                    setCurrentProfileImage(data.secure_url || data.url);

                    widget.close();
                    toast.success("Image uploaded successfully");
                  }
                }}
                onError={(error, { widget }) => {
                  console.error(error);
                  widget.close();
                  toast.error("Error uploading image");
                }}
              >
                {({ open }) => {
                  return (
                    <Button
                      variant="outline"
                      className="w-fit"
                      onClick={() => open()}
                      type="button"
                    >
                      <File className="size-4" />
                    </Button>
                  );
                }}
              </CldUploadWidget>
            )}

            {fields.profileImage.errors && (
              <p className="text-red-500 text-sm">
                {fields.profileImage.errors}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="space-x-2">
          <Button
            type="button"
            onClick={() => navigate.push("/dashboard")}
            variant={"outline"}
          >
            <MoveLeftIcon className="size-2" /> Back
          </Button>
          <SubmitButton text="Save Changes" />
        </CardFooter>
      </form>
    </Card>
  );
};

export default SettingsForm;
