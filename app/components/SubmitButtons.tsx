"use client";

import { Button } from "@/components/ui/button";
import { Fragment } from "react";
import { useFormStatus } from "react-dom";

import Image from "next/image";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  text: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined,
  className?: string
}
export const AuthButton = ({
  text,
  logo,
  alt,
}: {
  text: string;
  logo: any;
  alt: string;
}) => {
  const { pending } = useFormStatus();
  return (
    <Fragment>
      {pending ? (
        <Button variant={"outline"} className="w-full" disabled>
          <Loader2 className="size-4 mr-2 animate-spin" />
          Please Wait ...
        </Button>
      ) : (
        <Button variant={"outline"} className="w-full">
          <Image src={logo} alt={alt} className="size-4 mr-2 " />
          {text}
        </Button>
      )}
    </Fragment>
  );
};

export const SubmitButton = ({ text,variant ,className}: ButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Fragment>
      {pending ? (
        <Button  type="submit" variant={"outline"} className={cn("w-fit",className)} disabled>
          <Loader2 className="size-4 mr-2 animate-spin" />
          Please Wait ...
        </Button>
      ) : (
        <Button type="submit" variant={variant} className={cn("w-fit",className)}>{text}</Button>
      )}
    </Fragment>
  );
};
