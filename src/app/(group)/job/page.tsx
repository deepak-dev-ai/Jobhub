import JobCard from "@/components/job/job-card";
import prismaClient from "@/services/prisma";

export default async function JobsPage() {
  const jobs = await prismaClient.openings.findMany({
    include: {
      company: {
        include: {
          owner: true,
        },
      },
    },
  });
  return (
    <main className="px-4 overflow-x-hidden md:px-8 lg:px-16 py-10">
      <div className="flex flex-wrap justify-center gap-15">
        {jobs.map((job: any) => {
          return <JobCard fromSearch={false} key={job.id} job={job} />;
        })}
      </div>
    </main>
  );
}
