import JobCard from "@/components/job/job-card";
import { getUserFromCookies } from "@/services/helper";
import prismaClient from "@/services/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function AppliedJobPage() {
  const user = await getUserFromCookies();
  const applications = await prismaClient.application.findMany({
    where: {
      user_id: user?.id,
    },
    include: {
      job: {
        include: { company: true },
      },
    },
  });

  if (!applications.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <h2 className="text-lg font-semibold mb-4">No applications yet</h2>
        <p className="mb-6">Looks like you haven’t applied to any jobs.</p>
        <Link href="/search">
          <Button>Explore Jobs</Button>
        </Link>
      </div>
    );
  }

  return (
    <main className="p-4">
      <h1 className="text-2xl text-center font-bold mb-6">Your Applications</h1>

      <div className="flex flex-wrap justify-center">
        {applications.map((appli) => (
          <JobCard key={appli.id} job={appli.job} fromSearch={false} />
        ))}
      </div>
    </main>
  );
}
