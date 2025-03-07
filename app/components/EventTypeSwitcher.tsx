"use client";

import { toggleEvent } from "@/actions/event";
import { Switch } from "@/components/ui/switch";
import React, { useActionState, useEffect, useTransition } from "react";
import { toast } from "sonner";

interface EventTypeSwitcherProps {
  initialChecked: boolean;
  eventTypeId: string;
}
const EventTypeSwitcher = ({
  initialChecked,
  eventTypeId,
}: EventTypeSwitcherProps) => {
  const [isPending, startTransition] = useTransition();
  const [lastResult, action] = useActionState(toggleEvent, undefined);

  useEffect(() => {
    if (lastResult?.status === "success") {
      toast.success(lastResult.message);
    }
    if (lastResult?.status === "error") {
      toast.error(lastResult.message);
    }
  }, [lastResult]);
  return (
    <Switch
      disabled={isPending}
      onCheckedChange={(isChecked) =>
        startTransition(() => action({ eventTypeId, isChecked }))
      }
      defaultChecked={initialChecked}
    />
  );
};

export default EventTypeSwitcher;
