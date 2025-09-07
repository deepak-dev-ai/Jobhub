"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContext, useState } from "react";
import { UserContext } from "../layout";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddJobPage() {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Salary, setSalary] = useState("");
  const [EmploymentType, setEmploymentType] = useState("");
  const [JobType, setJobType] = useState("");
  const [Location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const router = useRouter();

  async function handleClick(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const salaryNum = Number.parseInt(Salary);
    const data = {
      title: Title,
      description: Description,
      salary: salaryNum,
      location: Location,
      job_type: JobType,
      employment_type: EmploymentType,
      company_id: user?.company.id,
    };
    const res = await fetch("http://localhost:3000/api/job", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const resData = await res.json();
    if (resData.success) {
      toast.success("Job added successfully");
      router.push("/");
    } else {
      toast.error("Something went wrong");
    }
    setLoading(false);
  }

  return (
    <main className="w-full min-h-screen flex justify-center items-center p-4">
      <Card className="w-full sm:w-[90%] md:w-[70%] lg:w-[50%] xl:w-[35%] p-6">
        <form onSubmit={handleClick}>
          <div className="grid gap-5">
            <div className="grid gap-2">
              <Label>Job Title</Label>
              <Input
                name="title"
                value={Title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter job title"
              />
            </div>
            <div className="grid gap-2">
              <Label>Job Description</Label>
              <Input
                name="desc"
                value={Description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter job description"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="grid gap-2">
                <Label>Job Location</Label>
                <Input
                  name="location"
                  value={Location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter location"
                />
              </div>
              <div className="grid gap-2">
                <Label>Job Salary</Label>
                <Input
                  name="salary"
                  type="number"
                  value={Salary}
                  onChange={(e) => setSalary(e.target.value)}
                  placeholder="e.g. 500000"
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="grid gap-2">
                <Label>Job Type</Label>
                <Select
                  value={JobType}
                  onValueChange={(value) => setJobType(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Job type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="office">Office</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Employment Type</Label>
                <Select
                  value={EmploymentType}
                  onValueChange={(value) => setEmploymentType(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Employment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full Time</SelectItem>
                    <SelectItem value="part-time">Part Time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button disabled={loading} type="submit" className="w-full">
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </Card>
    </main>
  );
}
