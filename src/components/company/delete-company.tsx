"use client";
import { UserContext } from "@/app/(group)/layout";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "sonner";

export default function DeleteCompanyButton({ id }: { id: string }) {
  const router = useRouter();
  const { user } = useContext(UserContext);
  async function HandleDelete() {
    try {
      const res = await fetch(`/api/company/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Company deleted successfully");
        router.push("/");
      } else {
        toast.error("Failed to delete company");
      }
    } catch (err) {
      console.error("Error deleting company:", err);
      toast.error("Something went wrong");
    }
  }
  if (!user?.company || id != user?.company.id) return null;
  else {
    return (
      <button onClick={HandleDelete}>
        <Trash2 />
      </button>
    );
  }
}
