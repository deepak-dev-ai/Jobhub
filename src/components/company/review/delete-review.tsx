"use client";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function DeleteReviewButton({ id }: { id: string }) {
  const handleDelete = async () => {
    const res = await fetch(`/api/review/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    if (data.success) {
      toast.success("Review deleted");
      window.location.reload();
    } else {
      toast.error("Failed to delete review");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-600 hover:text-red-800 cursor-pointer"
    >
      <Trash2 size={16} />
    </button>
  );
}
