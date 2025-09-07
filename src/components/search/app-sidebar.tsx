"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Card } from "../ui/card";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";

export function AppSidebar() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const jt = searchParams.get("jt");
  const et = searchParams.get("et");
  const ms = Number.parseInt(searchParams.get("ms") ?? "500000");

  const router = useRouter();
  const [jobType, setJobType] = useState(jt ?? "remote");
  const [employmentType, setEmploymentType] = useState(et ?? "Full-time");
  const [minSalary, setMinSalary] = useState(ms);

  function handleSubmit() {
    const url = `/search?q=${q}&jt=${jobType}&et=${employmentType}&ms=${minSalary}`;
    router.push(url);
  }
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center mt-6">
        <h1 className="font-semibold">FILTERS</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <Card className="pl-4">
            <h1 className="font-semibold">Job Type:</h1>
            <RadioGroup value={jobType} onValueChange={setJobType}>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="remote" id="r2" />
                <Label htmlFor="r2">Remote</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="office" id="r1" />
                <Label htmlFor="r1">Office</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="hybrid" id="r3" />
                <Label htmlFor="r3">Hybrid</Label>
              </div>
            </RadioGroup>
          </Card>
        </SidebarGroup>
        <SidebarGroup>
          <Card className="pl-4">
            <h1 className="font-semibold">Employment Type:</h1>
            <RadioGroup
              value={employmentType}
              onValueChange={setEmploymentType}
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="part-time" id="r2" />
                <Label htmlFor="r2">Part Time</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="full-time" id="r1" />
                <Label htmlFor="r1">Full Time</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="internship" id="r3" />
                <Label htmlFor="r3">Internship</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="contract" id="r4" />
                <Label htmlFor="r4">Contract</Label>
              </div>
            </RadioGroup>
          </Card>
        </SidebarGroup>
        <SidebarGroup>
          <Card className="px-4">
            <h1 className="font-semibold">Minimum Salary:</h1>
            <Slider
              value={[minSalary]}
              onValueChange={(val) => setMinSalary(val[0])}
              min={50000}
              max={1000000}
              step={50000}
            />
            <div className="flex justify-between">
              <span>₹50k</span>
              <span>₹10L</span>
            </div>
            <div className="text-sm text-gray-500 mt-2">
              Selected: ₹{minSalary.toLocaleString()}
            </div>
          </Card>
        </SidebarGroup>
        <Button className="cursor-pointer" onClick={handleSubmit}>
          Apply Filters
        </Button>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
