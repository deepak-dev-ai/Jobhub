"use client";
import { SendIcon } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useState } from "react";
export default function JobApplyButton({
  job,
  setUserHasApplied,
}: {
  job: { id: string };
  setUserHasApplied: (value: boolean) => void;
}) {
  const [loading, setLoading] = useState(false);
  async function handleApply() {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/job/apply/" + job?.id, {
        method: "POST",
      });
      const data = await res.json();
      if (data?.success) {
        toast.success("Applies successfully");
        setUserHasApplied(true);
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      const error = err as Error;
      console.log(error.message);
      toast.error("An error occurred while deleting the application.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <Button onClick={handleApply} disabled={loading}>
      {loading ? "Applying..." : "Apply"}
      <SendIcon size={16} />
    </Button>
  );
}
