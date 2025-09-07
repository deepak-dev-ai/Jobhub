"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Edit } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function UpdateReviewButton({
  id,
  revcon,
}: {
  id: string;
  revcon: string;
}) {
  const [content, setContent] = useState(revcon);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/review/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });

    const data = await res.json();
    if (data.success) {
      toast.success("Review updated");
      window.location.reload();
    } else {
      toast.error(data.message || "Failed to update review");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Edit size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleUpdate}>
          <DialogHeader>
            <DialogTitle>Edit review</DialogTitle>
            <DialogDescription>
              Make changes to your review here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="my-4">
            <Input
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
