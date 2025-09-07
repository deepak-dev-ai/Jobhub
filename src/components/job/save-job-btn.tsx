"use client";
import { Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { IconButton } from "../animate-ui/buttons/icon";
export default function JobSaveButton({
  job,
  userHasSaved,
  setUserHasSaved,
}: {
  job: { id: string };
  userHasSaved: boolean;
  setUserHasSaved: (value: boolean) => void;
}) {
  const [loading, setLoading] = useState(false);
  async function handleSave() {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/job/save/" + job?.id, {
        method: "POST",
      });
      const data = await res.json();
      if (data?.success) {
        toast.success("Job saved");
        setUserHasSaved(true);
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      const error = err as Error;
      console.log(error.message);
      toast.error("An error occurred while saving the job.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <IconButton
      icon={Heart}
      onClick={handleSave}
      active={userHasSaved}
      disabled={loading}
    ></IconButton>
  );
}
