"use client";
import { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { company, openings } from "../../../generated/prisma";
import { UserContext } from "@/app/(group)/layout";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

export default function ViewApplicants({
  job,
}: {
  job: openings & { company: company };
}) {
  const [applications, setApplications] = useState<
    { id: string; user: { email: string } }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function getApplications() {
      setLoading(true);
      const res = await fetch(`/api/applicants/${job.id}`);
      const data = await res.json();
      if (data?.success) {
        setApplications(data?.data);
      }
      setLoading(false);
    }
    getApplications();
  }, []);

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/applicants/${job.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data?.success) {
        toast.success("application deleted");
        const UpdatedApplications = applications.filter((elem) => {
          return elem.id != id;
        });
        setApplications(UpdatedApplications);
      } else {
        toast.error("Failed to delete application");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  if (user?.company?.id == job?.company_id) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">View Applicants</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Job Applicants</DialogTitle>
            <DialogDescription>
              Check the people who&apos;ve applied for the job.
            </DialogDescription>
          </DialogHeader>
          {loading}
          <div>
            {applications.map((application) => {
              return (
                <Card key={application?.id}>
                  <div className=" flex justify-between px-5">
                    <Badge>{application?.user.email}</Badge>
                    <button onClick={() => handleDelete(application.id)}>
                      <Trash2 className="text-red-500" />
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}
