import React from "react";
import AuthModal from "./AuthModal";
import Image from "next/image";
import heroImg from "@/public/better.png";
const Hero = () => {
  return (
    <section className="relative flex-col items-center flex justify-center py-12 lg:py-20">
      <div className="text-center">
        <span className="font-medium md:text-2xl  tracking-tighter text-sm text-primary bg-primary/10 px-4 py-2 rounded-full">
          Introducing Calendly
        </span>
        <h1 className="mt-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium leading-none">
          Scheduling made{" "}
          <span className="block text-primary -mt-2">super easy</span>
        </h1>
        <p className="mx-auto lg:text-lg max-w-xl mt-4 text-muted-foreground">
          Scheduling a meeting can be pain. But we at Calendly make it easy for
          your clients to schedule meetings with you
        </p>
        <div className="mt-2 mb-2">
          <AuthModal />
        </div>
      </div>
      <div className="relative items-center py-2 w-full mx-auto mt-2">
        <Image
          src={heroImg}
          alt="Hero Image"
          className="relative object-cover w-full border  rounded-lg shadow-2xl lg:rounded-2xl"
        />
      </div>
    </section>
  );
};

export default Hero;
