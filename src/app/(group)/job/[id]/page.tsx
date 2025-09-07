import ApplyDeleteJobButton from "@/components/job/apply-delete-btn";
import EditDeleteJob from "@/components/job/edit-delete-job-btn";
import SaveDeleteJobButton from "@/components/job/save-delete-btn";
import ViewApplicants from "@/components/job/view-job-applicants-btn";
import { Badge } from "@/components/ui/badge";
import { headers } from "next/headers";
import { Card } from "@/components/ui/card";
import baseUrl from "@/lib/utils";
import { getUserFromCookies } from "@/services/helper";
import prismaClient from "@/services/prisma";
import { BadgeCheckIcon, Briefcase, IndianRupee, MapPin } from "lucide-react";
import Link from "next/link";

export default async function JobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await fetch(`${baseUrl}/api/job/${id}`);
  const data = await res.json();
  const job = data.data;
  const user = await getUserFromCookies();

  let userHasApplied = false;
  if (user) {
    const application = await prismaClient.application.findMany({
      where: {
        job_id: id,
        user_id: user.id,
      },
    });
    if (application.length > 0) {
      userHasApplied = true;
    }
  }
  let userHasSaved = false;
  if (user) {
    const savedJobs = await prismaClient.saved_jobs.findMany({
      where: {
        job_id: id,
        user_id: user.id,
      },
    });
    if (savedJobs.length > 0) {
      userHasSaved = true;
    }
  }
  return (
    <div className="px-4 py-6 sm:px-6 md:px-10 lg:px-20 max-w-3xl mx-auto">
      <Card className="p-8 shadow-xl space-y-6 rounded-2xl">
        <div className="flex flex-col gap-2 mb-4">
          <h1 className="text-3xl font-extrabold break-words">{job.title}</h1>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="flex items-center gap-1 px-2 py-1"
            >
              <Briefcase className="w-4 h-4" />
              {job.employment_type}
            </Badge>
            <Badge
              variant="outline"
              className="flex items-center gap-1 px-2 py-1"
            >
              {job.job_type}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className="flex items-center gap-1 px-2 py-1"
            >
              <IndianRupee className="w-4 h-4" />
              {job.salary?.toLocaleString()}
            </Badge>
            <Badge
              variant="secondary"
              className="flex items-center gap-1 px-2 py-1"
            >
              <MapPin className="w-4 h-4" />
              {job.location}
            </Badge>
          </div>
        </div>
        <Link
          className="inline-flex items-center gap-1 text-sm hover:underline"
          href={`/company/${job.company.id}`}
        >
          <Badge
            variant="secondary"
            className="bg-blue-500 text-white dark:bg-blue-600 flex items-center gap-1 px-2 py-1 rounded-md"
          >
            <BadgeCheckIcon className="w-4 h-4" />
            {job.company.name}
          </Badge>
        </Link>
        <div className="leading-relaxed whitespace-pre-line mb-6">
          {job.description}
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          {user && user?.company?.id !== job.company.id && (
            <ApplyDeleteJobButton hasApplied={userHasApplied} job={job} />
          )}
          {user && user?.company?.id !== job.company.id && (
            <SaveDeleteJobButton hasSaved={userHasSaved} job={job} />
          )}
          <EditDeleteJob job={job} />
          <ViewApplicants job={job} />
        </div>
      </Card>
    </div>
  );
}
