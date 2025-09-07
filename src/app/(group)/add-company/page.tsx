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

  const router = useRouter();
  async function handleClick(e: FormEvent) {
    e.preventDefault();
    const company = {
      name,
      description: description,
      imageUrl: ImageUrl,
    };
    const res = await fetch("http://localhost:3000/api/company", {
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
    <main className="w-full h-full flex justify-center items-center">
      <Card className="w-[25%] h-[50%] p-8 m-30">
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
            <Button>Save</Button>
          </div>
        </form>
      </Card>
    </main>
  );
}
