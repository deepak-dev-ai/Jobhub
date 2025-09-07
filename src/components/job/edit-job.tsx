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
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { openings } from "../../../generated/prisma";
import { toast } from "sonner";
import { Edit } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function EditJob({ job }: { job: openings }) {
  const [Title, setTitle] = useState(job.title || "");
  const [Description, setDescription] = useState(job.description || "");
  const [Salary, setSalary] = useState(job.salary);
  const [EmploymentType, setEmploymentType] = useState(
    job.employment_type || ""
  );
  const [JobType, setJobType] = useState(job.job_type || "");
  const [Location, setLocation] = useState(job.location || "");
  const [loading, setLoading] = useState(false);
  async function handleClick() {
    setLoading(true);
    const data = {
      title: Title,
      description: Description,
      salary: Salary,
      location: Location,
      job_type: JobType,
      employment_type: EmploymentType,
    };
    try {
      const res = await fetch(`/api/job/${job.id}`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      if (resData.success) {
        toast.success("job edited");
      } else {
        toast.error("Failed to your edit job");
      }
    } catch (err) {
      toast.error("Failed to edit job");
    } finally {
      setLoading(false);
    }
  }
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Edit />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit your Job</DialogTitle>
            <DialogDescription>
              Click on save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label>Job Title</Label>
              <Input
                name="name"
                value={Title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label>Description</Label>
              <Input
                name="desc"
                value={Description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex gap-6">
              <div className="grid gap-3">
                <Label>Location</Label>
                <Input
                  name="location"
                  value={Location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <Label>Salary</Label>
                <Input
                  name="salary"
                  value={Salary}
                  onChange={(e) => setSalary(Number(e.target.value))}
                />
              </div>
            </div>
            <div className="flex gap-8">
              <div className="grid gap-3">
                <Label>Job Type</Label>
                <Select
                  name="jobtype"
                  value={JobType}
                  onValueChange={(value) => setJobType(value)}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="office">Office</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-3">
                <Label>Employment Type</Label>
                <Select
                  name="employmenttype"
                  value={EmploymentType}
                  onValueChange={(value) => setEmploymentType(value)}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Select" />
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
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button disabled={loading} type="submit" onClick={handleClick}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
