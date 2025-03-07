import React from "react";
import Navbar from "./components/Navbar";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Hero from "./components/Hero";

const Home = async() => {
  const session=await auth()

  if(session?.user) return redirect('/dashboard')
  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <Navbar />
      <Hero/>
    </div>
  );
};

export default Home;
