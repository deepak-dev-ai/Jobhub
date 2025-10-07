"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function AddCompanyPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ImageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  async function handleClick(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    const company = {
      name,
      description: description,
      imageUrl: ImageUrl,
    };
    const res = await fetch("/api/company", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(company),
    });
    const data = await res.json();
    console.log("API response:", data);
    if (data.success) {
      toast.success("Company added successfully");
      router.push("/");
    } else {
      toast.error("Something went wrong");
    }
  }

  return (
    <main className="w-full min-h-screen flex flex-col items-center p-9">
      <h1 className="text-2xl font-bold mb-6">Add Company</h1>
      <Card className="w-full sm:w-[90%] md:w-[70%] lg:w-[50%] xl:w-[35%] p-6">
        <form onSubmit={handleClick}>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label>Company Name</Label>
              <Input
                required
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label>Description</Label>
              <Input
                required
                name="desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label>Company Logo (Optional)</Label>
              <Input
                name="employmenttype"
                value={ImageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>
            <Button
              disabled={loading}
              type="submit"
              className="w-full cursor-pointer"
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </Card>
    </main>
  );
}
