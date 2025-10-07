import JobCard from "@/components/job/job-card";
import { getUserFromCookies } from "@/services/helper";
import prismaClient from "@/services/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function SavedJobPage() {
  const user = await getUserFromCookies();
  const savedJobs = await prismaClient.saved_jobs.findMany({
    where: {
      user_id: user?.id,
    },
    include: {
      job: {
        include: { company: true },
      },
    },
  });

  if (!savedJobs.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <h2 className="text-lg font-semibold mb-4">No saved jobs yet</h2>
        <p className="mb-6">Looks like you haven’t saved any jobs.</p>
        <Link href="/search">
          <Button className="cursor-pointer">Explore Jobs</Button>
        </Link>
      </div>
    );
  }

  return (
    <main className="p-4">
      <h1 className="text-2xl text-center font-bold mb-6">Your Saved Jobs</h1>
      <div className="flex flex-wrap justify-center">
        {savedJobs.map((job) => (
          <JobCard key={job.id} job={job.job} fromSearch={false} />
        ))}
      </div>
    </main>
  );
}
