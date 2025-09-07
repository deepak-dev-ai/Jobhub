"use client";
import { UserContext } from "@/app/(group)/layout";
import { Heart } from "lucide-react";
import { useContext, useState } from "react";
import { toast } from "sonner";
import { openings } from "../../../generated/prisma";
import { IconButton } from "../animate-ui/buttons/icon";
import JobSaveButton from "./save-job-btn";

export default function SaveDeleteJobButton({
  hasSaved,
  job,
}: {
  hasSaved: boolean;
  job: openings;
}) {
  const { user } = useContext(UserContext);
  const [userHasSaved, setUserHasSaved] = useState(hasSaved);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/job/save/${job.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data?.success) {
        toast.success("Job unsaved");
        setUserHasSaved(false);
      } else {
        toast.error("Failed to unsave job.");
      }
    } catch (error) {
      toast.error("An error occurred while unsaving the job.");
    } finally {
      setLoading(false);
    }
  }
  return !userHasSaved ? (
    <JobSaveButton
      job={job}
      userHasSaved={userHasSaved}
      setUserHasSaved={setUserHasSaved}
    />
  ) : (
    <IconButton
      icon={Heart}
      onClick={handleDelete}
      active
      disabled={loading}
    ></IconButton>
  );
}
