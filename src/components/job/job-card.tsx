import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { openings, company } from "../../../generated/prisma";
import Link from "next/link";
import { BadgeCheckIcon, MapPin, Briefcase, IndianRupee } from "lucide-react";

export type OpeningsWithCompany = openings & { company?: company };

export default function JobCard({
  job,
  fromSearch = false,
}: {
  job: OpeningsWithCompany;
  fromSearch?: Boolean;
}) {
  return (
    <div
      className={`${
        fromSearch ? "w-full" : "w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4"
      } p-2`}
    >
      <Card className="h-full p-6 flex flex-col justify-between shadow-md hover:shadow-xl border rounded-2xl transition-all duration-200 ease-in-out hover:scale-[1.01]">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-bold line-clamp-1">{job.title}</h1>
            <Badge className="flex items-center gap-1 h-5 text-sm px-2 py-1">
              <IndianRupee className="w-4 h-4" />
              {job.salary?.toLocaleString()}
            </Badge>
          </div>

          {job?.company && (
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
          )}

          <div className="flex flex-wrap gap-2 text-xs mt-2">
            <Badge
              variant="outline"
              className="flex items-center gap-1 px-2 py-1"
            >
              <Briefcase className="w-3 h-3" />
              {job.employment_type}
            </Badge>
            <Badge
              variant="outline"
              className="flex items-center gap-1 px-2 py-1"
            >
              {job.job_type}
            </Badge>
          </div>

          <p className="text-sm mt-2 line-clamp-3 text-gray-700">
            {job.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-6">
          <Badge
            variant="secondary"
            className="flex items-center gap-1 text-xs px-2 py-1"
          >
            <MapPin className="w-3 h-3" />
            {job.location}
          </Badge>
          <Link href={`/job/${job.id}`}>
            <Button size="sm" className="cursor-pointer ml-2 text-sm">
              View Details
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
