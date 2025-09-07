import JobCard, { OpeningsWithCompany } from "@/components/job/job-card";
import { PaginationDemo } from "@/components/search/pagination";
import { Badge } from "@/components/ui/badge";
import baseUrl from "@/lib/utils";

type searchPageQuery = Promise<{
  q: string;
  jt: string;
  et: string;
  ms: string;
  page: string;
}>;

export default async function SearchPage({
  searchParams,
}: {
  searchParams: searchPageQuery;
}) {
  const { q, jt, et, ms, page } = await searchParams;

  const params = new URLSearchParams();
  if (q) params.append("q", q);
  if (jt) params.append("jt", jt);
  if (et) params.append("et", et);
  if (ms && !isNaN(Number(ms))) params.append("ms", ms);
  if (page && !isNaN(Number(page))) params.append("page", page);

  const res = await fetch(`${baseUrl}/api/search?${params.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Failed to fetch jobs:", res.status);
    return (
      <div className="text-red-500 text-center mt-10">
        Failed to load job listings.
      </div>
    );
  }

  const data = await res.json();
  const jobs: OpeningsWithCompany[] = data.data;
  const totalPages: number = data.totalPages ?? 1;
  const currentPage: number = Number(page) || 1;

  return (
    <main className="min-h-[90vh] w-screen flex flex-col items-center p-6">
      {q && (
        <h2 className="text-lg font-medium mb-6 flex items-center gap-2">
          Showing search results for: <Badge>{q}</Badge>
        </h2>
      )}

      <div className="flex flex-wrap justify-center gap-10 w-full">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <JobCard key={job.id} job={job} fromSearch={true} />
          ))
        ) : (
          <p>No jobs found.</p>
        )}
      </div>

      {jobs.length > 0 && totalPages > 1 && (
        <footer className="mt-10">
          <PaginationDemo currentPage={currentPage} totalPages={totalPages} />
        </footer>
      )}
    </main>
  );
}
