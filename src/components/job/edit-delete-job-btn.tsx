"use client";
import { UserContext } from "@/app/(group)/layout";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "sonner";
import { openings } from "../../../generated/prisma";
import EditJob from "./edit-job";

export default function EditDeleteJob({ job }: { job: openings }) {
  const { user } = useContext(UserContext);
  const router = useRouter();
  async function handleDelete() {
    try {
      const res = await fetch("/api/job/" + job.id, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data?.success) {
        toast.success("Job deleted successfully");
        router.push("/");
      } else {
        toast.error("Failed to delete job");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  }
  if (user?.company?.id === job?.company_id) {
    return (
      <div className="flex gap-5">
        <button
          onClick={handleDelete}
          className="text-red-600 hover:text-red-800 cursor-pointer"
        >
          <Trash2 />
        </button>
        <EditJob job={job} />
      </div>
    );
  } else return null;
}
