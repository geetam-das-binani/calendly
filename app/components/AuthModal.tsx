import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import Image from "next/image";
import Logo from "@/public/logo.png";
import React from "react";
import { DialogTitle } from "@radix-ui/react-dialog";

import { AuthButton } from "./SubmitButtons";
import GoogleLogo from "@/public/google.svg";
import GithubLogo from "@/public/github.svg";
import { signIn } from "@/lib/auth";
const AuthModal = () => {

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Try For Free</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[360px]">
          <DialogHeader className="flex flex-col gap-2 items-center justify-center">
            <DialogTitle className="font-semibold sm:text-2xl text-xl ">
              Welcome
            </DialogTitle>
            <Image src={Logo} className="size-10" alt="logo" />
            <h4 className="text-3xl font-semibold">
              Cal<span className="text-primary">endly</span>
            </h4>
          </DialogHeader>
          <div className="flex flex-col mt-5 gap-3">
            <form
              action={async () => {
                "use server";
                await signIn("google");
              }}
              className="w-full"
            >
              {" "}
              <AuthButton
                text="Sign In with Google"
                logo={GoogleLogo}
                alt="googleLogo"
              />
            </form>

            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <AuthButton
                text="Sign in with Github"
                logo={GithubLogo}
                alt="githubLogo"
              />
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AuthModal;
