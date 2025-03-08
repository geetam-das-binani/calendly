import React from "react";
import Navbar from "./components/Navbar";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Hero from "./components/Hero";
import Logos from "./components/Logos";
import Features from "./components/Features";
import Testimonial from "./components/Testimonial";
import CTA from "./components/CTA";

const Home = async () => {
  const session = await auth();

  if (session?.user) return redirect("/dashboard");
  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <Navbar />
      <Hero />
      <Logos />
      <Features />
      <Testimonial />
      <CTA />
    </div>
  );
};

export default Home;
