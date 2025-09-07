"use client";
import { UserContext } from "@/app/(group)/layout";
import { useContext, useState } from "react";
import { toast } from "sonner";
import { openings } from "../../../generated/prisma";
import { Button } from "../ui/button";
import JobApplyButton from "./apply-job-btn";
import { Trash2 } from "lucide-react";

export default function ApplyDeleteJobButton({
  hasApplied,
  job,
}: {
  hasApplied: boolean;
  job: openings;
}) {
  const { user } = useContext(UserContext);
  const [userHasApplied, setUserHasApplied] = useState(hasApplied);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/job/apply/${job.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data?.success) {
        toast.success("Application deleted successfully");
        setUserHasApplied(false);
      } else {
        toast.error("Failed to delete application.");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the application.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      {!userHasApplied ? (
        <JobApplyButton job={job} setUserHasApplied={setUserHasApplied} />
      ) : (
        <Button onClick={handleDelete} disabled={loading}>
          {loading ? "Deleting..." : "Delete"}
          <Trash2 size={16} />
        </Button>
      )}
    </>
  );
}
