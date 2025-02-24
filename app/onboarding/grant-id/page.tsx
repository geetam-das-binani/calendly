import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import VideoGif from "@/public/work-is-almost-over-happy.gif";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CalendarCheck2 } from "lucide-react";
const onBoardingRouteTwo = () => {
  return (
    <div className="min-h-screen w-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>You are amlost Done!</CardTitle>
          <CardDescription>
            We have to now connect your calendar to your account
          </CardDescription>
          <Image
            alt="Almost Done Gif"
            className="w-full rounded-lg"
            src={VideoGif}
          />
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link href="/api/auth">
              <CalendarCheck2 className="size-4 mr-2" />
              Connect Calendar to your account
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default onBoardingRouteTwo;
