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
        <svg
          className="absolute inset-0 -mt-24 blur-3xl"
          style={{ zIndex: -1 }}
          fill="none"
          viewBox="0 0 400 400"
          height="100%"
          width="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_10_20)">
            <g filter="url(#filter0_f_10_20)">
              <path
                d="M128.6 0H0V322.2L106.2 134.75L128.6 0Z"
                fill="#03FFE0"
              ></path>
              <path
                d="M0 322.2V400H240H320L106.2 134.75L0 322.2Z"
                fill="#7C87F8"
              ></path>
              <path
                d="M320 400H400V78.75L106.2 134.75L320 400Z"
                fill="#4C65E4"
              ></path>
              <path
                d="M400 0H128.6L106.2 134.75L400 78.75V0Z"
                fill="#043AFF"
              ></path>
            </g>
          </g>
          <defs>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="720.666"
              id="filter0_f_10_20"
              width="720.666"
              x="-160.333"
              y="-160.333"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
              <feBlend
                in="SourceGraphic"
                in2="BackgroundImageFix"
                mode="normal"
                result="shape"
              ></feBlend>
              <feGaussianBlur
                result="effect1_foregroundBlur_10_20"
                stdDeviation="80.1666"
              ></feGaussianBlur>
            </filter>
          </defs>
        </svg>
        <Image
          src={heroImg}
          alt="Hero Image"
          className="
          relative 
          object-cover w-full border  rounded-lg shadow-2xl lg:rounded-2xl"
        />
      </div>
    </section>
  );
};

export default Hero;
