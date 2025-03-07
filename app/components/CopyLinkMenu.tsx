"use client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import React from "react";
import { Link2 } from "lucide-react";
import { toast } from "sonner";
const CopyLinkMenu = ({ meetingUrl }: { meetingUrl: string }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(meetingUrl);
      toast.success("Link copied");
    } catch (error) {
      console.log(error);
      toast.error("Could not copy link");
    }
  };
  return (
    <DropdownMenuItem onSelect={handleCopy}>
      <Link2 className="mr-2 size-4" />
      Copy
    </DropdownMenuItem>
  );
};

export default CopyLinkMenu;
